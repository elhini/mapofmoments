import React from 'react';

import { useAtom } from 'jotai';

import type { Map } from 'mapbox-gl';

import { Modal, ModalContent } from '@heroui/modal';
import { Form } from '@heroui/form';

import { isMomentImagesExpanded } from '@/atoms/ui';
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
import { ImagesField } from '@/components/moment-form/fields/ImagesField';

export type MomentFormProps = {
    moment?: Moment;
    onSubmit: () => void;
    onDelete: () => void;
    onClose: () => void;
    onDraggableIdChanged: (id: string) => void;
    map?: Map;
};

export const MomentForm: React.FC<MomentFormProps> = ({
    moment,
    onSubmit,
    onDelete,
    onClose,
    onDraggableIdChanged,
    map,
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
        useDragging(onDraggableIdChanged, map, moment);

    const [isImagesExpanded] = useAtom(isMomentImagesExpanded);
    const hiddenClass = isImagesExpanded ? 'hidden' : '';

    const submitCoords = async () => {
        applyCoords();
        await handleSubmit();
        disableDragging();
    };

    const coordsText = moment?.location.coordinates.map((c) => c.toFixed(6)).join(', ');

    const submitText = moment?.id ? 'Изменить' : 'Добавить';
    const enableDraggingBtn = moment?.id && <EnableDraggingButton onPress={enableDragging} />;
    const deleteBtn = moment?.id && <DeleteButton onPress={handleDelete} isLoading={isDeleting} />;

    return draggingEnabled ? (
        <DraggingForm submit={submitCoords} isSubmitting={isSubmitting} cancel={rollbackCoords} />
    ) : (
        <Modal
            className="fixed top-10 w-[300px] p-3 sm:top-[50%] sm:left-[50%] sm:m-0"
            isOpen
            onClose={onClose}
            hideCloseButton
        >
            <ModalContent className="overflow-visible">
                <Form
                    onSubmit={handleSubmit}
                    validationErrors={validationErrors}
                    className={hiddenClass}
                >
                    <div className="relative w-full">
                        <TextField value={formData?.title} onChange={handleChange} />
                        <div className="text-foreground-500 absolute top-2 right-3 z-10 text-xs">
                            {coordsText}
                        </div>
                    </div>

                    <DescriptionField value={formData?.description || ''} onChange={handleChange} />

                    <div className="flex w-full justify-between gap-2">
                        <DateField value={formData?.date} onChange={handleChange} />
                        <NotExactDateField
                            value={formData?.not_exact_date || false}
                            onChange={handleChange}
                        />
                    </div>

                    <TagsField value={formData?.tags} onChange={handleChange} />

                    {!isImagesExpanded && <ImagesField momentId={moment?.id} />}

                    <div className="flex w-full justify-between gap-2">
                        <SubmitButton text={submitText} isLoading={isSubmitting} />
                        <div className="flex gap-2">
                            {enableDraggingBtn}
                            {deleteBtn}
                        </div>
                    </div>

                    {submitErrorText && <ErrorAlert title={submitErrorText} />}
                </Form>

                {isImagesExpanded && <ImagesField momentId={moment?.id} />}

                <CloseBtn onPress={onClose} />
            </ModalContent>
        </Modal>
    );
};
