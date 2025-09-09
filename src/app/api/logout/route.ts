import type { NextRequest } from 'next/server';
import { SUPABASE_COOKIE_KEY } from '@/app/api/authUtils';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete(SUPABASE_COOKIE_KEY);
    return response;
}
