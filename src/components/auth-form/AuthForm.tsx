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
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 via-emerald-100 to-cyan-100 px-4 dark:from-slate-800 dark:via-slate-900 dark:to-black">
            <div className="animate-fade-in flex max-w-3xl flex-col items-center gap-8 rounded-2xl bg-white/70 p-10 text-center shadow-xl backdrop-blur-md dark:bg-slate-800/70">
                <h2 className="bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-3xl font-extrabold text-transparent">
                    Map of Moments
                </h2>
                <Form className="w-60" onSubmit={handleSubmit} validationErrors={validationErrors}>
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
            </div>
        </div>
    );
};
