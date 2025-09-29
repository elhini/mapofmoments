import { type NextRequest, NextResponse } from 'next/server';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getCurrentUser } from '@/app/api/authUtils';

// Удаление существующего тэга
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const supabase = getSupabaseServiceClient();
    const user = await getCurrentUser(req);
    const { id } = await context.params;
    const { error } = await supabase.from('tags').delete().eq('id', id).eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({});
}
