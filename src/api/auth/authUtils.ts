import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const buildSignUpOptions = (username: string) => ({
    data: { display_name: username },
});

export const SUPABASE_COOKIE_KEY = 'sb-access-token';

export const getToken = (req: NextRequest) => {
    const tokenFromHeader = req.headers.get('Authorization')?.replace('Bearer ', '');
    return tokenFromHeader || req.cookies.get(SUPABASE_COOKIE_KEY)?.value;
};

export const handleAuthorizedRequest = (accessToken: string, reqUrl: string) => {
    const response = NextResponse.redirect(new URL('/map', reqUrl), 303);
    response.cookies.set(SUPABASE_COOKIE_KEY, accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
};

export const handleUnauthorizedRequest = (pathname: string, reqUrl: string) => {
    if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/login', reqUrl));
    response.cookies.delete(SUPABASE_COOKIE_KEY);
    return response;
};
