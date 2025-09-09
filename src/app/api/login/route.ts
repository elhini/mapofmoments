import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/supabaseServiceClient';
import { handleAuthorizedRequest } from '@/app/api/authUtils';

// api/login
export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const supabase = getSupabaseServiceClient();
    const params = { email, password };
    const { data, error } = await supabase.auth.signInWithPassword(params);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const accessToken = data?.session?.access_token;
    if (!accessToken) {
        // Strange case, but we should handle it
        return NextResponse.json({ error: 'No access token returned' }, { status: 500 });
    }
    return handleAuthorizedRequest(accessToken, req.url);
}
