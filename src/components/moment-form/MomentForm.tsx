'use client';

import React from 'react';
import { I18nProvider } from '@react-aria/i18n';

import { Modal, ModalContent } from '@heroui/modal';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { DatePicker } from '@heroui/date-picker';
import { Checkbox } from '@heroui/checkbox';

import type { Moment } from '@/api-client/moments/momentsApi';
import { useMomentForm } from '@/hooks/useMomentForm';
import { SubmitButton } from '@/components/moment-form/SubmitButton';
import { DeleteButton } from '@/components/moment-form/DeleteButton';
import { CloseBtn } from '@/components/moment-form/CloseButton';
import { EnableDraggingButton } from '@/components/moment-form/EnableDraggingButton';
import { ErrorAlert } from '@/components/error-alert/ErrorAlert';
import { getCalendarDate } from '@/utils/getCalendarDate';

export type MomentFormProps = {
    data?: Moment;
    onSubmit: () => void;
    onDelete: () => void;
    onClose: () => void;
    onEnableDragging: () => void;
};

export const MomentForm: React.FC<MomentFormProps> = ({
    data,
    onSubmit,
    onDelete,
    onClose,
    onEnableDragging,
}) => {
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
    const enableDraggingBtn = data?.id && <EnableDraggingButton onPress={onEnableDragging} />;
    const deleteBtn = data?.id && <DeleteButton onPress={handleDelete} isLoading={isDeleting} />;
    const closeBtn = <CloseBtn onPress={onClose} />;

    return (
        <Modal
            className="fixed top-[50%] w-[300px] p-3 sm:left-[50%] sm:m-0"
            isOpen
            onClose={onClose}
            hideCloseButton
        >
            <ModalContent className="overflow-visible">
                <Form onSubmit={handleSubmit} validationErrors={validationErrors}>
                    <div className="relative w-full">
                        <Input
                            label="Заголовок"
                            name="title"
                            type="text"
                            value={formData?.title || ''}
                            onChange={(e) => handleChange(e.target)}
                            autoFocus
                            isRequired
                            errorMessage="Заголовок обязателен"
                        />
                        <div className="text-foreground-500 absolute top-2 right-3 text-xs">
                            {coordsText}
                        </div>
                    </div>

                    <Textarea
                        label="Описание"
                        name="description"
                        type="text"
                        value={formData?.description || ''}
                        onChange={(e) => handleChange(e.target)}
                    />

                    <div className="flex w-full justify-between gap-2">
                        <I18nProvider locale="ru">
                            <DatePicker
                                label="Дата"
                                name="date"
                                firstDayOfWeek="mon"
                                value={getCalendarDate(formData?.date)}
                                onChange={(v) =>
                                    handleChange({ name: 'date', value: v?.toString() })
                                }
                                className="w-34"
                            />
                        </I18nProvider>
                        <Checkbox
                            name="not_exact_date"
                            isSelected={formData?.not_exact_date}
                            onValueChange={(v) =>
                                handleChange({ name: 'not_exact_date', value: v })
                            }
                            size="sm"
                        >
                            Примерная дата
                        </Checkbox>
                    </div>

                    <div className="flex w-full justify-between gap-2">
                        <SubmitButton text={submitText} isLoading={isSubmitting} />
                        <div className="flex gap-2">
                            {enableDraggingBtn}
                            {deleteBtn}
                        </div>
                    </div>

                    {mutationError && <ErrorAlert title={mutationError.statusText} />}
                </Form>
                {closeBtn}
            </ModalContent>
        </Modal>
    );
};
