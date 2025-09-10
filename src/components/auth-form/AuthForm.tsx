'use client';

import React from 'react';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useAuthForm } from '@/hooks/useAuthForm';
import type { AuthFormProps, AuthFormMode } from '@/types/auth';
import { ErrorAlert } from '@/components/error-alert/ErrorAlert';

interface AuthFormComponentProps extends AuthFormProps {
    mode: AuthFormMode;
}

export const AuthForm: React.FC<AuthFormComponentProps> = ({
    mode,
    onSubmit,
    isLoading: externalLoading,
    error: externalError,
}) => {
    const {
        formData,
        errors,
        isLoading: internalLoading,
        handleChange,
        handleSubmit,
    } = useAuthForm({ mode, onSubmit });

    const isLoading = externalLoading || internalLoading;
    const title = mode === 'login' ? 'Вход' : 'Регистрация';
    const submitText = mode === 'login' ? 'Войти' : 'Зарегистрироваться';

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
            <h2 className="text-center text-3xl">{title}</h2>

            <Form className="w-60" onSubmit={handleSubmit} validationErrors={errors}>
                {mode === 'register' && (
                    <Input
                        label="Логин"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        isRequired
                        errorMessage="Логин обязателен"
                    />
                )}

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    isRequired
                    errorMessage="Email не корректный"
                />

                <Input
                    label="Пароль"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    isRequired
                    errorMessage="Пароль не корректный"
                />

                <Button type="submit" color="primary" size="lg" fullWidth isLoading={isLoading}>
                    {submitText}
                </Button>

                {externalError && <ErrorAlert title={externalError} />}

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
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
                    </p>
                </div>
            </Form>
        </div>
    );
};
