import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupabaseServiceClient } from './app/api/supabaseClient';
import { handleUnauthorizedRequest } from './app/api/auth/authUtils';

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|public|api/login|api/register|login|register|verify-email).*)',
    ],
};

export async function middleware(req: NextRequest) {
    // Get token from Authorization header or cookie
    const authHeader = req.headers.get('Authorization');
    let token = authHeader?.replace('Bearer ', '');
    if (!token) {
        token = req.cookies.get('sb-access-token')?.value;
    }
    // Check token existence
    if (!token) {
        return handleUnauthorizedRequest(req.nextUrl.pathname, req.url);
    }
    // Check token validity
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
        return handleUnauthorizedRequest(req.nextUrl.pathname, req.url);
    }

    // Authenticated, continue
    return NextResponse.next();
}
