import { useEffect, useState } from 'react';
import type { MomentFormData } from '@/types/moment';

interface UseMomentFormProps {
    data?: MomentFormData;
    onSubmit: (data: MomentFormData) => void;
}

export const useMomentForm = ({ data, onSubmit }: UseMomentFormProps) => {
    const [formData, setFormData] = useState<MomentFormData>(data || { title: '' });
    useEffect(() => setFormData(data || { title: '' }), [data]);
    const [errors, setErrors] = useState<Partial<MomentFormData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<MomentFormData> = {};

        if (!formData.title) {
            newErrors.title = 'Заголовок обязателен';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            onSubmit(formData);
        } catch (error) {
            console.error('Moment error:', error);
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
        if (errors[name as keyof MomentFormData]) {
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
