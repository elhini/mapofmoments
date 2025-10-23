import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { handleAuthorizedRequest } from '@/app/api/authUtils';

// api/register
export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const supabase = getSupabaseServiceClient();
    const params = { email, password };
    const { data, error } = await supabase.auth.signUp(params);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const accessToken = data?.session?.access_token;
    if (!accessToken) {
        // Registration may require email confirmation, so `session` may be null
        return NextResponse.redirect(new URL('/verify-email', req.url), 303);
    }
    return handleAuthorizedRequest(accessToken, req.url);
}
