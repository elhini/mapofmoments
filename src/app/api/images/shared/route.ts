import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { isPrivateMoment } from '@/app/api/moments/[id]/images/isPrivateMoment';

// Получение изображения по опубликованному моменту
export async function GET(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const momentId = req.nextUrl.searchParams.get('momentId');
    const isPrivate = await isPrivateMoment(momentId);

    if (isPrivate) {
        return NextResponse.json({ error: 'moment is not public' }, { status: 400 });
    }

    const { data: moments, error } = await supabase
        .from('moment_images')
        .select('id,storage_path')
        .eq('moment_id', momentId)
        .order('created_at', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(moments);
}
