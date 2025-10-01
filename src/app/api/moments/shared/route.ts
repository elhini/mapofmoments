import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

// Получение точек по опубликованному тэгу
export async function GET(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const tagPublicId = req.nextUrl.searchParams.get('tagPublicId');

    const { data: moments, error } = await supabase
        .from('moments')
        .select(
            `*,
            tags !inner ( public_id )`,
        )
        .eq('tags.public_id', tagPublicId)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(moments);
}
