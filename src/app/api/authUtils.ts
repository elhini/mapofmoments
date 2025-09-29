import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from './getSupabaseServiceClient';
import type { User } from '@supabase/auth-js';

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

export const handleUnauthorizedRequest = (reqUrl: string) => {
    const response = NextResponse.redirect(new URL('/login', reqUrl), 303);
    response.cookies.delete(SUPABASE_COOKIE_KEY);
    return response;
};

export const getCurrentUser = async (req: NextRequest) => {
    const supabase = getSupabaseServiceClient();
    const token = getToken(req);
    const { data } = await supabase.auth.getUser(token);

    return data?.user || ({} as User);
};
