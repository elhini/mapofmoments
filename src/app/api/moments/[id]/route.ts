import { type NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/api/supabaseClient';
import { getCurrentUser } from '@/api/auth/authUtils';

// Изменение существующей точки
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);

    const body = await req.json();
    const { title, description, location } = body;
    if (!title || !location?.lng || !location?.lat) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('moments')
        .update({
            title,
            description,
            location: `SRID=4326;POINT(${location.lng} ${location.lat})`,
        })
        .eq('id', params.id)
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
