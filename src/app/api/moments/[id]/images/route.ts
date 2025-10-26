import { type NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';

// Добавление изображения
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();

    const user = await getCurrentUser(req);
    const momentId = (await context.params).id;
    const path = `${user.id}/${momentId}/${randomUUID()}.jpg`; // TODO: use extension from file

    const formData = await req.formData();
    const file = formData.get('file') as File;

    const { error: uploadError } = await supabase.storage.from('moment_images').upload(path, file);

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
        .select()
        .eq('user_id', user.id)
        .eq('moment_id', momentId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
