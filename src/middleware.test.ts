import type { Mock } from 'vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { middleware } from './middleware';
import { getToken, handleUnauthorizedRequest } from './app/api/authUtils';
import { getSupabaseServiceClient } from './app/api/getSupabaseServiceClient';

vi.mock('./app/api/authUtils', () => ({
    getToken: vi.fn() as Mock,
    handleUnauthorizedRequest: vi.fn(),
}));
vi.mock('./app/api/getSupabaseServiceClient', () => ({
    getSupabaseServiceClient: vi.fn(),
}));

const createRequest = (
    pathname: string,
    url = 'http://localhost' + pathname,
    headers: Record<string, string> = {},
    cookies: Record<string, string> = {},
) =>
    ({
        nextUrl: { pathname },
        headers: { get: (key: string) => headers[key] },
        cookies: { get: (key: string) => cookies[key] },
        url,
    }) as unknown as NextRequest;

beforeEach(() => {
    vi.clearAllMocks();
});

describe('middleware', () => {
    it('allows access to public routes without token', async () => {
        (getToken as Mock).mockReturnValue(undefined);
        const req = createRequest('/');
        const res = await middleware(req);
        expect(handleUnauthorizedRequest).not.toHaveBeenCalled();
        expect(res).toEqual(NextResponse.next());
    });

    it('redirects to login for protected routes without token', async () => {
        (getToken as Mock).mockReturnValue(undefined);
        const req = createRequest('/map');
        const res = await middleware(req);
        expect(handleUnauthorizedRequest).toHaveBeenCalledWith('/map', req.url);
        expect(res).toEqual(undefined);
    });

    it('allows access to public routes with invalid token', async () => {
        (getToken as Mock).mockReturnValue('invalid-token');
        (getSupabaseServiceClient as Mock).mockReturnValue({
            auth: { getUser: () => ({ error: 'invalid_token' }) },
        });
        const req = createRequest('/login');
        const res = await middleware(req);
        expect(handleUnauthorizedRequest).not.toHaveBeenCalled();
        expect(res).toEqual(NextResponse.next());
    });

    it('redirects to login for protected routes with invalid token', async () => {
        (getToken as Mock).mockReturnValue('invalid-token');
        (getSupabaseServiceClient as Mock).mockReturnValue({
            auth: { getUser: () => ({ error: 'invalid_token' }) },
        });
        const req = createRequest('/map');
        const res = await middleware(req);
        expect(handleUnauthorizedRequest).toHaveBeenCalledWith('/map', req.url);
        expect(res).toEqual(undefined);
    });

    it('redirects to /map for public routes with valid token', async () => {
        (getToken as Mock).mockReturnValue('valid-token');
        (getSupabaseServiceClient as Mock).mockReturnValue({
            auth: { getUser: () => ({ data: {} }) },
        });
        const req = createRequest('/login');
        const res = await middleware(req);
        expect(handleUnauthorizedRequest).not.toHaveBeenCalled();
        expect(res).toEqual(NextResponse.redirect(new URL('/map', req.url)));
    });

    it('allows access to protected routes with valid token', async () => {
        (getToken as Mock).mockReturnValue('valid-token');
        (getSupabaseServiceClient as Mock).mockReturnValue({
            auth: { getUser: () => ({ data: {} }) },
        });
        const req = createRequest('/map');
        const res = await middleware(req);
        expect(handleUnauthorizedRequest).not.toHaveBeenCalled();
        expect(res).toEqual(NextResponse.next());
    });
});
