import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

import posthog from 'posthog-js';

import type { AuthFormData, AuthFormMode } from '@/types/auth';
import { useLoginMutation, useRegisterMutation } from '@/hooks/useAuthApi';

interface UseAuthFormProps {
    mode: AuthFormMode;
}

type FormErrors = Partial<AuthFormData>;

const emptyData: AuthFormData = { email: '', password: '' };

export const useAuthForm = ({ mode }: UseAuthFormProps) => {
    const [formData, setFormData] = useState<AuthFormData>(emptyData);
    const [validationErrors, setValidationErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов';
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
        posthog.capture(mode, { email: formData.email });
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
