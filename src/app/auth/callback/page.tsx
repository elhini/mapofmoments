'use client';

import { useEffect } from 'react';

import { Card } from '@heroui/card';

export default function AuthCallbackPage() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.slice(1)); // Implicit OAuth flow
        const accessToken = params.get('access_token') || '';

        window.location.href = '/api/auth/callback?accessToken=' + accessToken;
    }, []);

    return (
        <Card className="fixed top-[50%] left-[50%] translate-x-[-50%] p-3">Redirecting...</Card>
    );
}
