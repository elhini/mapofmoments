'use client';

import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import type { AuthFormData } from '@/types/auth';
import { useRegisterMutation } from '@/hooks/useAuthApi';

export default function RegisterPage() {
    const mutation = useRegisterMutation();

    const handleRegister = async (data: AuthFormData) => {
        await mutation.mutateAsync({
            email: data.email,
            password: data.password,
            username: data.username,
        });
    };

    const errorMessage = mutation.error ? mutation.error.statusText || 'Registration failed' : '';

    return (
        <AuthForm
            mode="register"
            onSubmit={handleRegister}
            isLoading={mutation.isPending}
            error={errorMessage}
        />
    );
}
