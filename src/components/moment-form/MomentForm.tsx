'use client';

import React from 'react';

import type { Marker } from 'mapbox-gl';

import { Modal, ModalContent } from '@heroui/modal';
import { Form } from '@heroui/form';

import type { Moment } from '@/types/moment';
import { useMomentForm } from '@/hooks/useMomentForm';

import { SubmitButton } from '@/components/moment-form/buttons/SubmitButton';
import { DeleteButton } from '@/components/moment-form/buttons/DeleteButton';
import { CloseBtn } from '@/components/moment-form/buttons/CloseButton';
import { EnableDraggingButton } from '@/components/moment-form/buttons/EnableDraggingButton';

import { DraggingForm } from '@/components/moment-form/DraggingForm';
import { useDragging } from '@/components/moment-form/useDragging';
import { ErrorAlert } from '@/components/error-alert/ErrorAlert';

import { TextField } from '@/components/moment-form/fields/TextField';
import { DescriptionField } from '@/components/moment-form/fields/DescriptionField';
import { DateField } from '@/components/moment-form/fields/DateField';
import { NotExactDateField } from '@/components/moment-form/fields/NotExactDateField';
import { TagsField } from '@/components/moment-form/fields/TagsField';

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
        submitErrorText,
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
                        <TextField value={formData?.title} onChange={handleChange} />
                        <div className="text-foreground-500 absolute top-2 right-3 text-xs">
                            {coordsText}
                        </div>
                    </div>

                    <DescriptionField value={formData?.description} onChange={handleChange} />

                    <div className="flex w-full justify-between gap-2">
                        <DateField value={formData?.date} onChange={handleChange} />
                        <NotExactDateField
                            value={formData?.not_exact_date}
                            onChange={handleChange}
                        />
                    </div>

                    <TagsField value={formData?.tags} onChange={handleChange} />

                    <div className="flex w-full justify-between gap-2">
                        <SubmitButton text={submitText} isLoading={isSubmitting} />
                        <div className="flex gap-2">
                            {enableDraggingBtn}
                            {deleteBtn}
                        </div>
                    </div>

                    {submitErrorText && <ErrorAlert title={submitErrorText} />}
                </Form>
                {closeBtn}
            </ModalContent>
        </Modal>
    );
};
