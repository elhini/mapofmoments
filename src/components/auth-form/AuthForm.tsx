'use client';

import React from 'react';

import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

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
            className="animate-fade-in m-5 flex w-80 max-w-3xl flex-col items-center gap-4 rounded-2xl bg-white/70 p-5 text-center shadow-xl backdrop-blur-md sm:gap-8 sm:p-10 dark:bg-slate-800/70"
            onSubmit={handleSubmit}
            validationErrors={validationErrors}
        >
            <h2 className="mb-6 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-3xl font-extrabold text-transparent">
                Map of Moments
            </h2>
            {mode === 'register' && (
                <Input
                    label="Логин"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    isRequired
                    autoFocus={mode === 'register'}
                />
            )}

            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                isRequired
                autoFocus={mode === 'login'}
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
                        <a href="/register" className="text-blue-600 hover:text-blue-500">
                            Зарегистрироваться
                        </a>
                    </>
                ) : (
                    <>
                        Уже есть аккаунт?{' '}
                        <a href="/login" className="text-blue-600 hover:text-blue-500">
                            Войти
                        </a>
                    </>
                )}
            </div>

            <AuthWithGoogle />
        </Form>
    );
};
