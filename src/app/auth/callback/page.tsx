'use client';

import { useEffect } from 'react';

import { getSupabaseBrowserClient } from '@/api-client/getSupabaseBrowserClient';

export default function AuthCallbackPage() {
    const supabase = getSupabaseBrowserClient();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.slice(1)); // TODO: check how to avoid hash parsing
        const accessToken = params.get('access_token') || '';

        window.location.href = '/api/auth/callback?accessToken=' + accessToken;
    }, [supabase.auth]);

    return 'Redirecting...';
}
