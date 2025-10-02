import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';

import type { Tag } from '@/types/tag';

// Изменение существующего тэга
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);

    const body: Tag = await req.json();

    const { data, error } = await supabase
        .from('tags')
        .update({ name: body.name, is_chain: body.isChain })
        .eq('id', (await context.params).id)
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// Удаление существующего тэга
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);
    const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', (await context.params).id)
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({});
}
