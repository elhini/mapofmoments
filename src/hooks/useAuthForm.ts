import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

import type { AuthFormData, AuthFormMode } from '@/types/auth';
import { useLoginMutation, useRegisterMutation } from '@/hooks/useAuthApi';

interface UseAuthFormProps {
    mode: AuthFormMode;
}

type FormErrors = Partial<AuthFormData>;

export const useAuthForm = ({ mode }: UseAuthFormProps) => {
    const [formData, setFormData] = useState<AuthFormData>({
        email: '',
        password: '',
        username: '',
    });
    const [validationErrors, setValidationErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email обязателен';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Некорректный email';
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
        }

        if (mode === 'register' && !formData.username) {
            newErrors.username = 'Логин обязателен';
        }

        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const registerMutation = useRegisterMutation();
    const loginMutation = useLoginMutation();
    const isSubmitting = registerMutation.isPending || loginMutation.isPending;
    const mutationError = registerMutation.error || loginMutation.error;
    const mutationErrorText = mutationError ? mutationError?.statusText || 'Что-то сломалось' : '';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        const submit =
            mode === 'register' ? registerMutation.mutateAsync : loginMutation.mutateAsync;
        await submit(formData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (validationErrors[name as keyof FormErrors]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    return {
        formData,
        validationErrors,
        submitErrorText: mutationErrorText,
        handleChange,
        handleSubmit,
        isSubmitting,
    };
};
