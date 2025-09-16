import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getToken, handleUnauthorizedRequest } from '@/app/api/authUtils';

export const config = {
    matcher: [
        // TODO: move custom paths from regexp to array of strings
        '/((?!_next|favicon.ico|public|api/login|api/register|verify-email|auth/callback|api/auth/callback).*)',
    ],
};

export async function middleware(req: NextRequest) {
    // TODO: use publicRoutes
    const isRegisterOrLogin = ['/', '/register', '/login'].includes(req.nextUrl.pathname);
    const token = getToken(req);
    // Check token existence
    if (!token) {
        if (isRegisterOrLogin) {
            return NextResponse.next();
        }
        return handleUnauthorizedRequest(req.nextUrl.pathname, req.url);
    }
    // Check token validity
    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.auth.getUser(token);
    if (error) {
        if (isRegisterOrLogin) {
            return NextResponse.next();
        }
        return handleUnauthorizedRequest(req.nextUrl.pathname, req.url);
    }
    // Redirect to /map if just authenticated
    if (isRegisterOrLogin) {
        return NextResponse.redirect(new URL('/map', req.url));
    }

    // Pass through if already authenticated
    return NextResponse.next();
}
