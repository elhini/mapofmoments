'use client';

import React from 'react';
import { Modal, ModalContent } from '@heroui/modal';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { X } from 'lucide-react';

import type { Moment } from '@/api-client/moments/momentsApi';
import { useMomentForm } from '@/hooks/useMomentForm';
import { SubmitButton } from '@/components/moment-form/SubmitButton';
import { DeleteButton } from '@/components/moment-form/DeleteButton';
import { ErrorAlert } from '@/components/error-alert/ErrorAlert';

export type MomentFormProps = {
    data?: Moment;
    onSubmit: () => void;
    onDelete: () => void;
    onClose: () => void;
};

export const MomentForm: React.FC<MomentFormProps> = ({ data, onSubmit, onDelete, onClose }) => {
    const {
        formData,
        validationErrors,
        mutationError,
        handleChange,
        handleSubmit,
        handleDelete,
        isSubmitting,
        isDeleting,
    } = useMomentForm({ data, onSubmit, onDelete });

    const coordsText = formData?.location.coordinates.map((c) => c.toFixed(6)).join(', ');
    const submitText = data?.id ? 'Изменить' : 'Добавить';
    const deleteBtn = data?.id ? (
        <DeleteButton onPress={handleDelete} isLoading={isDeleting} />
    ) : null;

    return (
        <Modal
            className="fixed top-[50%] w-[280px] p-3 sm:left-[50%] sm:m-0"
            isOpen
            onClose={onClose}
        >
            <ModalContent>
                <Form onSubmit={handleSubmit} validationErrors={validationErrors}>
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

                    <div className="relative w-full">
                        <Textarea
                            label="Описание"
                            name="description"
                            type="text"
                            value={formData?.description || ''}
                            onChange={handleChange}
                        />
                        <div className="text-foreground-500 absolute top-2 right-3 text-xs">
                            {coordsText}
                        </div>
                    </div>

                    <div className="flex w-full justify-between gap-2">
                        <SubmitButton text={submitText} isLoading={isSubmitting} />
                        <div className="flex gap-2">
                            <Button onPress={onClose} isIconOnly>
                                <X />
                            </Button>
                            {deleteBtn}
                        </div>
                    </div>

                    {mutationError && <ErrorAlert title={mutationError.statusText} />}
                </Form>
            </ModalContent>
        </Modal>
    );
};
