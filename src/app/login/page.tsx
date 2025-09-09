'use client';

import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import type { AuthFormData } from '@/types/auth';
import { useLoginMutation } from '@/hooks/useAuthApi';

export default function LoginPage() {
    const mutation = useLoginMutation();

    const handleLogin = async (data: AuthFormData) => {
        await mutation.mutateAsync({ email: data.email, password: data.password });
    };

    const errorMessage = mutation.error ? mutation.error.statusText || 'Login failed' : '';

    return (
        <AuthForm
            mode="login"
            onSubmit={handleLogin}
            isLoading={mutation.isPending}
            error={errorMessage}
        />
    );
}
