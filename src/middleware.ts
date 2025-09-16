import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getToken, handleUnauthorizedRequest } from '@/app/api/authUtils';

export const config = { matcher: ['/((?!_next|favicon.ico|public).*)'] };

const authStartPages = ['/register', '/login'];

const authProcessPages = ['/verify-email', '/auth/callback'];
const authProcessRoutes = ['/api/login', '/api/register', '/api/auth/callback'];
const publicPaths = ['/', ...authProcessRoutes, ...authProcessPages];

export async function middleware(req: NextRequest) {
    const isPublicPath = publicPaths.includes(req.nextUrl.pathname);
    // Pass through if public
    if (isPublicPath) return NextResponse.next();

    const isAuthStart = authStartPages.includes(req.nextUrl.pathname);
    const token = getToken(req);

    // Check token existence
    if (!token) {
        if (isAuthStart) return NextResponse.next();
        return handleUnauthorizedRequest(req.nextUrl.pathname, req.url);
    }

    // Check token validity
    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.auth.getUser(token);
    if (error) {
        if (isAuthStart) return NextResponse.next();
        return handleUnauthorizedRequest(req.nextUrl.pathname, req.url);
    }

    // Redirect to /map if just authenticated
    if (isAuthStart) return NextResponse.redirect(new URL('/map', req.url));

    // Pass through if already authenticated
    return NextResponse.next();
}
