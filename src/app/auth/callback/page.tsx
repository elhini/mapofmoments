'use client';

import { useEffect } from 'react';

export default function AuthCallbackPage() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.slice(1)); // Implicit OAuth flow
        const accessToken = params.get('access_token') || '';

        window.location.href = '/api/auth/callback?accessToken=' + accessToken;
    }, []);

    return <div className="flex min-h-screen items-center justify-center">Redirecting...</div>;
}
