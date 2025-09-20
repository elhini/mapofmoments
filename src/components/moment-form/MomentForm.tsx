'use client';

import React from 'react';
import { I18nProvider } from '@react-aria/i18n';

import type { Marker } from 'mapbox-gl';

import { Modal, ModalContent } from '@heroui/modal';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { DatePicker } from '@heroui/date-picker';
import { Checkbox } from '@heroui/checkbox';

import type { Moment } from '@/api-client/moments/momentsApi';
import { useMomentForm } from '@/hooks/useMomentForm';
import { SubmitButton } from '@/components/moment-form/buttons/SubmitButton';
import { DeleteButton } from '@/components/moment-form/buttons/DeleteButton';
import { CloseBtn } from '@/components/moment-form/buttons/CloseButton';
import { EnableDraggingButton } from '@/components/moment-form/buttons/EnableDraggingButton';
import { DraggingForm } from '@/components/moment-form/DraggingForm';
import { useDragging } from '@/components/moment-form/useDragging';
import { ErrorAlert } from '@/components/error-alert/ErrorAlert';
import { getCalendarDate } from '@/utils/getCalendarDate';

export type MomentFormProps = {
    moment?: Moment;
    onSubmit: () => void;
    onDelete: () => void;
    onClose: () => void;
    marker: Marker | null;
};

export const MomentForm: React.FC<MomentFormProps> = ({
    moment,
    onSubmit,
    onDelete,
    onClose,
    marker,
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
    } = useMomentForm({ moment, onSubmit, onDelete });

    const { draggingEnabled, enableDragging, disableDragging, applyCoords, rollbackCoords } =
        useDragging(marker, moment);

    const submitCoords = async () => {
        applyCoords();
        await handleSubmit();
        disableDragging();
    };

    const coordsText = formData?.location.coordinates.map((c) => c.toFixed(6)).join(', ');

    const submitText = moment?.id ? 'Изменить' : 'Добавить';
    const enableDraggingBtn = moment?.id && <EnableDraggingButton onPress={enableDragging} />;
    const deleteBtn = moment?.id && <DeleteButton onPress={handleDelete} isLoading={isDeleting} />;
    const closeBtn = <CloseBtn onPress={onClose} />;

    return draggingEnabled ? (
        <DraggingForm submit={submitCoords} isSubmitting={isSubmitting} cancel={rollbackCoords} />
    ) : (
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
