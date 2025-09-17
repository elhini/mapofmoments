import { type NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';
import type { Moment } from '@/api-client/moments/momentsApi';

// Изменение существующей точки
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);
    const { id } = await context.params;
    const body: Moment = await req.json();
    const { title, description, date, not_exact_date, location } = body;
    if (!title || !location?.coordinates) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('moments')
        .update({
            title,
            description,
            date,
            not_exact_date,
            location: `SRID=4326;POINT(${location.coordinates[0]} ${location.coordinates[1]})`,
        })
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Moment not found or user not authorized' },
            { status: 404 },
        );
    }

    return NextResponse.json(data);
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
