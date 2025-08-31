'use client';

import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import type { AuthFormData } from '@/types/auth';
import { useLoginMutation } from '@/hooks/useAuthApi';

export default function LoginPage() {
    const mutation = useLoginMutation();

    const handleLogin = async (data: AuthFormData) => {
        await mutation.mutateAsync({ email: data.email, password: data.password });
    };

    const errorMessage = mutation.error ? mutation.error.statusText || 'Login failed' : '';

    return <LoginForm onSubmit={handleLogin} isLoading={mutation.isPending} error={errorMessage} />;
}
