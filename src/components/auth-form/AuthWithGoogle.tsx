import React from 'react';
import { Button } from '@heroui/button';

import { getSupabaseBrowserClient } from '@/api-client/getSupabaseBrowserClient';

export const AuthWithGoogle = () => {
    const supabase = getSupabaseBrowserClient();

    const signIn = () => {
        // https://supabase.com/docs/guides/auth/social-login/auth-google
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth-callback` },
        });
    };

    return (
        <Button
            onPress={signIn}
            // like Google colors
            className="mt-4 w-full border-t-red-500 border-r-blue-500 border-b-green-500 border-l-yellow-500 text-gray-600"
            variant="bordered"
            size="lg"
        >
            Войти через Google
        </Button>
    );
};
