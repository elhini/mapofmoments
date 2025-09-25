import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';
import { buildLocationString } from '@/app/api/coordUtils';
import { upsertTags } from '@/app/api/tags/upsertTags';

import type { Moment } from '@/types/moment';

// Изменение существующей точки
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);
    if (!user) {
        return NextResponse.json({ error: 'User not authorized' }, { status: 401 });
    }

    const body: Moment = await req.json();
    const { title, description, date, not_exact_date, location } = body;
    if (!title || !location?.coordinates) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { tags, tagsError } = await upsertTags(user.id, body.id, body.tags);
    if (tagsError) {
        return NextResponse.json({ error: tagsError }, { status: 500 });
    }

    const { data, error } = await supabase
        .from('moments')
        .update({
            title,
            description,
            date,
            not_exact_date,
            location: buildLocationString(location),
        })
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

    return NextResponse.json({ ...data, tags });
}

// Удаление существующей точки
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);
    const { id } = await context.params;
    const { error } = await supabase.from('moments').delete().eq('id', id).eq('user_id', user?.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({});
}
