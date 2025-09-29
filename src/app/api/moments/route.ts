import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';
import { buildLocationString } from '@/app/api/coordUtils';
import { upsertTags } from '@/app/api/tags/upsertTags';

import type { Moment } from '@/types/moment';

// Добавление новой точки
export async function POST(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: Moment = await req.json();
    const { title, description, date, not_exact_date, location } = body;
    if (!title || !location?.coordinates) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('moments')
        .insert({
            title,
            description,
            date,
            not_exact_date,
            location: buildLocationString(location),
            user_id: user.id,
            created_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { tags, error: tagsError } = await upsertTags(user.id, data.id, body.tags);
    if (tagsError) {
        return NextResponse.json({ error: 'Tags error, ' + tagsError }, { status: 500 });
    }

    return NextResponse.json({ ...data, tags });
}

// Получение всех точек пользователя
export async function GET(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);

    const { data: moments, error } = await supabase
        .from('moments')
        .select(
            `*,
            tags ( id,name )`,
        )
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(moments);
}
