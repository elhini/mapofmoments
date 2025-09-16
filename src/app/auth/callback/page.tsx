'use client';

import { useEffect } from 'react';

export default function AuthCallbackPage() {
    const hash = typeof window === 'undefined' ? '' : window.location.hash.slice(1);
    const params = new URLSearchParams(hash); // Implicit OAuth flow
    const accessToken = params.get('access_token');

    useEffect(() => {
        if (accessToken) {
            window.location.href = '/api/auth/callback?accessToken=' + accessToken;
        }
    }, [accessToken]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            {accessToken ? 'Redirecting...' : 'No access token'}
        </div>
    );
}
