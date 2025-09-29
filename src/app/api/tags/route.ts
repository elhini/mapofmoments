import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';
import type { Tag } from '@/types/tag';

// Получение всех тэгов пользователя
export async function GET(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);

    const { data: tags, error } = await supabase
        .from('tags')
        .select('id, name, moment_tags(count)')
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const tagsSorted = tags
        .map(
            (t): Tag => ({
                id: t.id,
                name: t.name,
                momentsCount: t.moment_tags[0].count,
            }),
        )
        .sort((t1, t2) => (t2.momentsCount || 0) - (t1.momentsCount || 0)); // desc

    return NextResponse.json(tagsSorted);
}
