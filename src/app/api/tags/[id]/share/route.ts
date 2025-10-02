import { type NextRequest, NextResponse } from 'next/server';

import { randomUUID } from 'crypto';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';

// Публикация существующего тэга
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);

    const { data, error } = await supabase
        .from('tags')
        .update({ public_id: randomUUID() })
        .eq('id', (await context.params).id)
        .eq('user_id', user.id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({ error: 'Moment not found' }, { status: 404 });
    }

    return NextResponse.json(data.public_id);
}
