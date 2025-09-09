'use client';

import React from 'react';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Modal, ModalContent } from '@heroui/modal';
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
        <Modal className="fixed top-[50%] left-[50%] w-[240px] p-3 sm:m-0" isOpen onClose={onClose}>
            <ModalContent>
                <Form onSubmit={handleSubmit} validationErrors={errors}>
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
            </ModalContent>
        </Modal>
    );
};
