import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import type { Moment } from '@/api-client/moments/momentsApi';
import {
    useCreateMomentMutation,
    useDeleteMomentMutation,
    useUpdateMomentMutation,
} from '@/hooks/useMomentsApi';

interface UseMomentFormProps {
    data?: Moment;
    onSubmit: () => void;
    onDelete: () => void;
}

type FormErrors = Partial<Omit<Moment, 'id' | 'location'>>;

type ChangeArgs = { name: string; value?: string };

const emptyMoment: Moment = {
    id: '',
    title: '',
    date: '',
    location: { coordinates: [0, 0] },
};

export const useMomentForm = ({ data, onSubmit, onDelete }: UseMomentFormProps) => {
    const [formData, setFormData] = useState<Moment | undefined>(data);
    useEffect(() => setFormData(data), [data]);
    const [validationErrors, setValidationErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData?.title) {
            newErrors.title = 'Заголовок обязателен';
        }

        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const id = data?.id || '';
    const createMutation = useCreateMomentMutation();
    const updateMutation = useUpdateMomentMutation(id);
    const deleteMutation = useDeleteMomentMutation(id);
    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isDeleting = deleteMutation.isPending;
    const mutationError = createMutation.error || updateMutation.error || deleteMutation.error;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData || !validateForm()) return;
        const submit = id ? updateMutation.mutateAsync : createMutation.mutateAsync;
        await submit(formData);
        onSubmit();
    };

    const handleDelete = async () => {
        await deleteMutation.mutateAsync();
        onDelete();
    };

    const handleChange = ({ name, value }: ChangeArgs) => {
        if (value === undefined) return;
        setFormData((prev) => {
            const prevData = prev || emptyMoment;
            return { ...prevData, [name]: value };
        });

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
        mutationError,
        handleChange,
        handleSubmit,
        handleDelete,
        isSubmitting,
        isDeleting,
    };
};
