'use client';

import React from 'react';

import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

import { useAuthForm } from '@/hooks/useAuthForm';
import type { AuthFormMode } from '@/types/auth';
import { ErrorAlert } from '@/components/error-alert/ErrorAlert';
import { AuthWithGoogle } from '@/components/auth-form/AuthWithGoogle';

interface AuthFormComponentProps {
    mode: AuthFormMode;
}

export const AuthForm: React.FC<AuthFormComponentProps> = ({ mode }) => {
    const {
        formData,
        validationErrors,
        submitErrorText,
        handleChange,
        handleSubmit,
        isSubmitting,
    } = useAuthForm({ mode });

    const submitText = mode === 'login' ? 'Войти' : 'Зарегистрироваться';

    return (
        <Form
            className="animate-fade-in m-5 flex w-80 max-w-3xl flex-col items-center gap-2 rounded-2xl bg-white/70 p-5 text-center shadow-xl backdrop-blur-md sm:p-10 dark:bg-slate-800/70"
            onSubmit={handleSubmit}
            validationErrors={validationErrors}
        >
            <a
                href="/"
                className="mb-6 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-3xl font-extrabold text-transparent"
            >
                Map of Moments
            </a>

            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                isRequired
                autoFocus
            />

            <Input
                label="Пароль"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                isRequired
            />

            <Button
                type="submit"
                color="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                className="rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md"
            >
                {submitText}
            </Button>

            {submitErrorText && <ErrorAlert title={submitErrorText} />}

            <div className="mt-4 w-full text-center text-sm text-gray-600">
                {mode === 'login' ? (
                    <>
                        Нет аккаунта?{' '}
                        <Link href="/register" className="text-sm">
                            Зарегистрироваться
                        </Link>
                    </>
                ) : (
                    <>
                        Уже есть аккаунт?{' '}
                        <Link href="/login" className="text-sm">
                            Войти
                        </Link>
                    </>
                )}
            </div>

            <AuthWithGoogle />
        </Form>
    );
};
