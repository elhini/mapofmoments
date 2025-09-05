import { getToken } from '@/api/auth/authUtils';
import { getSupabaseServiceClient } from '@/api/supabaseClient';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const token = getToken(req);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(data.user);
}
