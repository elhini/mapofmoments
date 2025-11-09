import { type NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import sharp from 'sharp';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';
import { momentImagesBucket } from '@/constants/buckets';
import { getMomentImagesCount } from '@/app/api/moments/[id]/images/getMomentImagesCount';
import { MAX_IMAGES_PER_MOMENT } from '@/constants/images';

// Добавление изображения
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();

    const user = await getCurrentUser(req);
    const momentId = (await context.params).id;

    const { count } = await getMomentImagesCount(user.id, momentId);
    if (count && count >= MAX_IMAGES_PER_MOMENT) {
        return NextResponse.json(
            { error: `No more than ${MAX_IMAGES_PER_MOMENT} images per 1 moment` },
            { status: 400 },
        );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    const extension = file.name.split('.').pop();
    const path = `${user.id}/${momentId}/${randomUUID()}.${extension}`;

    const image = sharp(await file.arrayBuffer());
    const format = (await image.metadata()).format;
    const resized = await image.resize(1920, 1920, { fit: 'inside' }).toBuffer();

    const { error: uploadError } = await supabase.storage
        .from(momentImagesBucket)
        .upload(path, resized, { contentType: `image/${format}` });

    if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data, error } = await supabase
        .from('moment_images')
        .insert({
            user_id: user.id,
            moment_id: momentId,
            storage_path: path,
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// Получение изображений
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();

    const user = await getCurrentUser(req);
    const momentId = (await context.params).id;

    const { data, error } = await supabase
        .from('moment_images')
        .select('id,storage_path')
        .eq('user_id', user.id)
        .eq('moment_id', momentId)
        .order('created_at', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
