import { useState } from 'react';
import type { AuthFormData, AuthFormMode } from '@/types/auth';

interface UseAuthFormProps {
    mode: AuthFormMode;
    onSubmit: (data: AuthFormData) => void;
}

type FormErrors = Partial<AuthFormData>;

export const useAuthForm = ({ mode, onSubmit }: UseAuthFormProps) => {
    const [formData, setFormData] = useState<AuthFormData>({
        email: '',
        password: '',
        username: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        // const data = Object.fromEntries(new FormData(e.currentTarget));

        setIsLoading(true);
        try {
            onSubmit(formData);
        } catch (error) {
            console.error('Auth error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
    };
};
