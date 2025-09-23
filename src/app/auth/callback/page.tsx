'use client';

import { useEffect, useState } from 'react';

export default function AuthCallbackPage() {
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        const hash = typeof window === 'undefined' ? '' : window.location.hash.slice(1);
        const params = new URLSearchParams(hash); // Implicit OAuth flow
        const accessToken = params.get('access_token');
        if (accessToken) {
            setRedirecting(true);
            window.location.href = '/api/auth/callback?accessToken=' + accessToken;
        }
    }, []);

    return (
        <div className="text-foreground flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-emerald-100 to-cyan-100">
            {redirecting ? 'Перенаправление...' : 'Нет токена доступа'}
        </div>
    );
}
