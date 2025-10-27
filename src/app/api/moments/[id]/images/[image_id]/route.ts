import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';

// Удаление существующего изображения
export async function DELETE(req: NextRequest, context: { params: Promise<{ image_id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);
    const id = (await context.params).image_id;
    const { data } = await supabase
        .from('moment_images')
        .select('storage_path')
        .eq('id', id)
        .single();
    const { error } = await supabase
        .from('moment_images')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
    await supabase.storage.from('moments').remove([data?.storage_path]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({});
}
