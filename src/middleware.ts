import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { getToken, handleUnauthorizedRequest } from '@/app/api/authUtils';

export const config = { matcher: ['/((?!_next|favicon.ico|og-image.png|static).*)'] };

const authStartPages = ['/register', '/login'];

const authProcessPages = ['/verify-email', '/auth-callback', '/reset-password', '/update-password'];
const authProcessRoutes = ['/api/login', '/api/register', '/api/auth-callback'];

const publicPaths = ['/', ...authProcessRoutes, ...authProcessPages, '/about'];
const sharedPaths = ['/share', '/api/moments/shared'];

export async function middleware(req: NextRequest) {
    const isPublicPath = publicPaths.includes(req.nextUrl.pathname);
    const isSharedPath = sharedPaths.some((p) => req.nextUrl.pathname.startsWith(p));
    // Pass through if public or shared
    if (isPublicPath || isSharedPath) return NextResponse.next();

    const token = getToken(req);
    const isAuthStart = authStartPages.includes(req.nextUrl.pathname);

    // Check token existence
    if (!token) {
        if (isAuthStart) return NextResponse.next();
        return handleUnauthorizedRequest(req.url);
    }

    // Check token validity
    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.auth.getUser(token);
    if (error) {
        if (isAuthStart) return NextResponse.next();
        return handleUnauthorizedRequest(req.url);
    }

    // Redirect to /map if just authenticated
    if (isAuthStart) return NextResponse.redirect(new URL('/map', req.url));

    // Pass through if already authenticated
    return NextResponse.next();
}
