import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupabaseServiceClient } from '@/api/supabaseClient';
import { handleUnauthorizedRequest, SUPABASE_COOKIE_KEY } from '@/api/auth/authUtils';

const supabase = getSupabaseServiceClient();

export const config = {
    matcher: ['/((?!_next|favicon.ico|public|api/login|api/register|verify-email).*)'],
};

export async function middleware(req: NextRequest) {
    const isRegisterOrLogin = ['/register', '/login'].includes(req.nextUrl.pathname);
    // Get token from Authorization header or Supabase cookie
    const tokenFromHeader = req.headers.get('Authorization')?.replace('Bearer ', '');
    const token = tokenFromHeader || req.cookies.get(SUPABASE_COOKIE_KEY)?.value;
    // Check token existence
    if (!token) {
        if (isRegisterOrLogin) {
            return NextResponse.next();
        }
        return handleUnauthorizedRequest(req.nextUrl.pathname, req.url);
    }
    // Check token validity
    const { error } = await supabase.auth.getUser(token);
    if (error) {
        if (isRegisterOrLogin) {
            return NextResponse.next();
        }
        return handleUnauthorizedRequest(req.nextUrl.pathname, req.url);
    }
    // Redirect to /map if authenticated
    if (isRegisterOrLogin) {
        return NextResponse.redirect(new URL('/map', req.url));
    }

    // Pass through if authenticated
    return NextResponse.next();
}
