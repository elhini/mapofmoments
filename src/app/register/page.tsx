'use client';

import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import type { AuthFormData } from '../types/auth';
import { useRegisterMutation } from '../hooks/useAuthApi';

export default function RegisterPage() {
    const mutation = useRegisterMutation();

    const handleRegister = async (data: AuthFormData) => {
        await mutation.mutateAsync({
            email: data.email,
            password: data.password,
            username: data.username ?? '',
        });
    };

    const errorMessage = mutation.error ? mutation.error.statusText || 'Registration failed' : '';

    return (
        <RegisterForm
            onSubmit={handleRegister}
            isLoading={mutation.isPending}
            error={errorMessage}
        />
    );
}
