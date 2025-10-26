import type { FormEvent } from 'react';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';

import type { Moment, MomentImage } from '@/types/moment';
import type { Tag } from '@/types/tag';
import {
    useCreateMomentMutation,
    useDeleteMomentMutation,
    useUpdateMomentMutation,
} from '@/hooks/useMomentsApi';

interface UseMomentFormProps {
    moment?: Moment;
    onSubmit: () => void;
    onDelete: () => void;
}

type FormErrors = Record<string, string | string[]>;

type ChangeArgs = { name: string; value?: string | boolean | Tag[] | MomentImage[] };

const emptyMoment: Moment = {
    id: '',
    title: '',
    date: '',
    not_exact_date: false,
    tags: [],
    location: { coordinates: [0, 0] },
};

export const useMomentForm = ({ moment, onSubmit, onDelete }: UseMomentFormProps) => {
    const [formData, setFormData] = useState<Moment | undefined>(moment);
    useEffect(() => setFormData(moment), [moment]);
    const [validationErrors, setValidationErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData?.title) {
            newErrors.title = 'Заголовок обязателен';
        }

        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const id = moment?.id || '';
    const createMutation = useCreateMomentMutation();
    const updateMutation = useUpdateMomentMutation(id);
    const deleteMutation = useDeleteMomentMutation(id);
    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isDeleting = deleteMutation.isPending;
    const mutationError = createMutation.error || updateMutation.error || deleteMutation.error;
    const mutationErrorText = mutationError ? mutationError?.statusText || 'Что-то сломалось' : '';

    const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        if (!formData || !validateForm()) return;
        const submit = id ? updateMutation.mutateAsync : createMutation.mutateAsync;
        await submit(formData);
        onSubmit();
    };

    const handleDelete = async () => {
        await deleteMutation.mutateAsync();
        onDelete();
    };

    const handleChange = useCallback(
        ({ name, value }: ChangeArgs) => {
            if (value === undefined) return;
            setFormData((prev) => {
                const prevData = prev || emptyMoment;
                return { ...prevData, [name]: value };
            });

            // Clear error when user starts typing
            if (validationErrors[name]) {
                setValidationErrors((prev) => ({
                    ...prev,
                    [name]: '',
                }));
            }
        },
        [validationErrors],
    );

    return {
        formData,
        validationErrors,
        submitErrorText: mutationErrorText,
        handleChange,
        handleSubmit,
        handleDelete,
        isSubmitting,
        isDeleting,
    };
};
