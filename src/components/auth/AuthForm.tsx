'use client';

import React from 'react';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { useAuthForm } from '@/hooks/useAuthForm';
import type { AuthFormProps, AuthFormMode } from '@/types/auth';

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

            <form className="w-60" onSubmit={handleSubmit}>
                {mode === 'register' && (
                    <Input
                        label="Логин"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                        placeholder="Введите ваш логин"
                        required
                    />
                )}

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Введите ваш email"
                    required
                />

                <Input
                    label="Пароль"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="Введите ваш пароль"
                    required
                />

                <Button type="submit" variant="primary" width="full" isLoading={isLoading}>
                    {submitText}
                </Button>

                {externalError && (
                    <div className="rounded-md bg-red-50 p-3 font-medium text-red-800">
                        {externalError}
                    </div>
                )}

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
            </form>
        </div>
    );
};
