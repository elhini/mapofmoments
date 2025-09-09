'use client';

import React from 'react';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { useMomentForm } from '@/hooks/useMomentForm';
import type { MomentFormData } from '@/types/moment';

export type MomentFormProps = {
    onSubmit: (data: MomentFormData) => void;
    onClose: () => void;
    data?: MomentFormData;
    isLoading?: boolean;
    error?: string;
};

export const MomentForm: React.FC<MomentFormProps> = ({
    onSubmit,
    onClose,
    data,
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
        <div className="fixed top-0 bottom-0 left-5 flex flex-col items-center justify-center gap-8">
            <Form className="w-[220px]" onSubmit={handleSubmit} validationErrors={errors}>
                <Input
                    label="Заголовок"
                    name="title"
                    type="text"
                    value={formData.title || ''}
                    onChange={handleChange}
                    isRequired
                    errorMessage="Заголовок обязателен"
                />

                <Textarea
                    label="Описание"
                    name="description"
                    type="text"
                    value={formData.description || ''}
                    onChange={handleChange}
                />

                <div className="flex w-full justify-between gap-2">
                    <Button type="submit" color="primary" isLoading={isLoading}>
                        {submitText}
                    </Button>
                    <Button type="button" onPress={onClose}>
                        Закрыть
                    </Button>
                </div>

                {externalError && (
                    <div className="rounded-md bg-red-50 p-3 font-medium text-red-800">
                        {externalError}
                    </div>
                )}
            </Form>
        </div>
    );
};
