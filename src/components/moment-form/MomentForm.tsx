'use client';

import React from 'react';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { useMomentForm } from '@/hooks/useMomentForm';
import type { MomentFormData } from '@/types/moment';

export type MomentFormProps = {
    onSubmit: (data: MomentFormData) => void;
    data?: MomentFormData;
    isLoading?: boolean;
    error?: string;
};

export const MomentForm: React.FC<MomentFormProps> = ({
    data,
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
    } = useMomentForm({ data, onSubmit });

    const isLoading = externalLoading || internalLoading;
    const submitText = data ? 'Изменить' : 'Создать';

    return (
        <div className="fixed top-20 left-5 flex flex-col items-center justify-center gap-8">
            <form className="w-[220px]" onSubmit={handleSubmit}>
                <Input
                    label="Заголовок"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    error={errors.title}
                    placeholder="Введите ваш заголовок"
                    required
                />

                <Input
                    label="Описание"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    error={errors.description}
                    placeholder="Введите ваше описание"
                />

                <Button type="submit" variant="primary" width="full" isLoading={isLoading}>
                    {submitText}
                </Button>

                {externalError && (
                    <div className="rounded-md bg-red-50 p-3 font-medium text-red-800">
                        {externalError}
                    </div>
                )}
            </form>
        </div>
    );
};
