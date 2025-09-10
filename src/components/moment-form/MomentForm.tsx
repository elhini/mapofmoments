'use client';

import React from 'react';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Modal, ModalContent } from '@heroui/modal';

import type { Moment } from '@/api-client/moments/momentsApi';
import { useMomentForm } from '@/hooks/useMomentForm';
import { DeleteButton } from '@/components/moment-form/DeleteButton';

export type MomentFormProps = {
    data?: Moment;
    onSubmit: () => void;
    onDelete: () => void;
    onClose: () => void;
    isSubmitting?: boolean;
    isDeleting?: boolean;
    error?: string;
};

export const MomentForm: React.FC<MomentFormProps> = ({
    onSubmit,
    onDelete,
    onClose,
    data,
    error: externalError,
}) => {
    const { formData, errors, handleChange, handleSubmit, handleDelete, isSubmitting, isDeleting } =
        useMomentForm({ data, onSubmit, onDelete });

    const submitText = data ? 'Изменить' : 'Создать';
    const deleteBtn = data ? <DeleteButton onPress={handleDelete} isLoading={isDeleting} /> : null;

    return (
        <Modal
            className="fixed top-[50%] w-[280px] p-3 sm:left-[50%] sm:m-0"
            isOpen
            onClose={onClose}
        >
            <ModalContent>
                <Form onSubmit={handleSubmit} validationErrors={errors}>
                    <Input
                        label="Заголовок"
                        name="title"
                        type="text"
                        value={formData?.title || ''}
                        onChange={handleChange}
                        autoFocus
                        isRequired
                        errorMessage="Заголовок обязателен"
                    />

                    <Textarea
                        label="Описание"
                        name="description"
                        type="text"
                        value={formData?.description || ''}
                        onChange={handleChange}
                    />

                    <div className="flex w-full justify-between gap-2">
                        <Button type="submit" color="primary" isLoading={isSubmitting}>
                            {submitText}
                        </Button>
                        <div className="flex gap-2">
                            <Button type="button" onPress={onClose}>
                                Закрыть
                            </Button>
                            {deleteBtn}
                        </div>
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
