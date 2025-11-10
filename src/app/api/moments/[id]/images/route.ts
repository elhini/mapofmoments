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

    const image = sharp(await file.arrayBuffer());
    const metadata = await image.metadata();
    const { width = 0, height = 0, format } = metadata;
    const needResize = width > 1920 || height > 1920;
    const buffer = needResize
        ? await image.resize(1920, 1920, { fit: 'inside' }).toBuffer()
        : await image.toBuffer();

    const path = `${user.id}/${momentId}/${randomUUID()}.${format}`;

    const { error: uploadError } = await supabase.storage
        .from(momentImagesBucket)
        .upload(path, buffer, { contentType: `image/${format}` });

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
