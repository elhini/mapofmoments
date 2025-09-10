import { type NextRequest, NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';
import type { Moment } from '@/api-client/moments/momentsApi';

// Добавление новой точки
export async function POST(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);

    const body: Moment = await req.json();
    const { title, description, location } = body;
    if (!title || !location?.coordinates) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('moments')
        .insert({
            user_id: user?.id,
            created_at: new Date().toISOString(),
            title,
            description,
            location: `SRID=4326;POINT(${location.coordinates[0]} ${location.coordinates[1]})`,
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// Получение всех точек пользователя
export async function GET(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);

    const { data: moments, error } = await supabase
        .from('moments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(moments);
}
