import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';

// Удаление существующего изображения
export async function DELETE(req: NextRequest, context: { params: Promise<{ image_id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);
    const id = (await context.params).image_id;

    const { data, error } = await supabase
        .from('moment_images')
        .select('storage_path')
        .eq('id', id)
        .single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { error: deleteError } = await supabase
        .from('moment_images')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    const { error: removeError } = await supabase.storage
        .from('moment_images')
        .remove([data?.storage_path]);
    if (removeError) {
        return NextResponse.json({ error: removeError.message }, { status: 500 });
    }

    return NextResponse.json({});
}
