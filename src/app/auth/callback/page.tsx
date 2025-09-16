'use client';

import { useEffect } from 'react';

import { Card } from '@heroui/card';

import { getSupabaseBrowserClient } from '@/api-client/getSupabaseBrowserClient';

export default function AuthCallbackPage() {
    const supabase = getSupabaseBrowserClient();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.slice(1)); // TODO: check how to avoid hash parsing
        const accessToken = params.get('access_token') || '';

        window.location.href = '/api/auth/callback?accessToken=' + accessToken;
    }, [supabase.auth]);

    return (
        <Card className="fixed top-[50%] left-[50%] translate-x-[-50%] p-3">Redirecting...</Card>
    );
}
