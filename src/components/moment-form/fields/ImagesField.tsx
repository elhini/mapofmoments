import React, { useRef } from 'react';

import { useAtom } from 'jotai';

import { ImagePlus } from 'lucide-react';

import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';
import { Alert } from '@heroui/alert';
import type { AlertProps } from '@heroui/alert';

import { isMomentImagesExpanded } from '@/atoms/ui';
import {
    useCreateMomentImageMutation,
    useGetAllMomentImagesQuery,
} from '@/hooks/useMomentImagesApi';
import { MomentImages } from '@/components/moment-images/MomentImages';
import { useFileDragging } from '@/components/moment-form/useFileDragging';
import { MAX_IMAGES_PER_MOMENT } from '@/constants/images';
import { showError } from '@/utils/showError';

const Message = ({ color, children }: AlertProps) => (
    <Alert hideIcon className="text-foreground-500 px-0 py-1 text-xs" color={color}>
        <div className="self-center">{children}</div>
    </Alert>
);

const limitText = `Не больше ${MAX_IMAGES_PER_MOMENT} изображений на 1 момент`;

type Props = {
    momentId?: string;
};

export const ImagesField = ({ momentId = '' }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isImagesExpanded] = useAtom(isMomentImagesExpanded);

    const { data: images = [], isError } = useGetAllMomentImagesQuery(momentId);
    const { mutateAsync: upload, isPending: isUploading } = useCreateMomentImageMutation(momentId);

    const onFilesSelected = async (files: FileList | null) => {
        if (!files || !momentId) return;
        const totalCount = images.length + files.length;
        if (totalCount > MAX_IMAGES_PER_MOMENT) {
            showError({ title: limitText });
            return;
        }
        for (const file of Array.from(files)) {
            const fd = new FormData();
            fd.append('file', file);
            await upload(fd);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilesSelected(e.target.files);
        // reset input so same file can be selected again
        if (inputRef.current) inputRef.current.value = '';
    };

    const { handleDrop, handleDragOver, handleDragEnter, handleDragLeave, isDragActive } =
        useFileDragging(onFilesSelected);
    const draggingClassNames = isDragActive ? 'border-primary-400 bg-primary-50 cursor-copy' : '';

    if (!momentId) return <Message>Сохраните момент, чтобы добавить&nbsp;изображения</Message>;

    const gallery = (
        <MomentImages images={images} isError={isError} momentId={momentId} withDelete />
    );
    if (isImagesExpanded) return gallery;

    const uploadDisabled = images.length >= MAX_IMAGES_PER_MOMENT;

    return (
        <>
            <Tooltip
                isDisabled={!uploadDisabled}
                content={limitText}
                offset={-6}
                delay={500}
                className="bg-warning-100"
            >
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    className={`border-foreground-200 flex w-full items-center justify-between gap-2 rounded border-2 border-dashed p-2 ${draggingClassNames}`}
                >
                    <Button
                        onPress={() => inputRef.current?.click()}
                        isLoading={isUploading}
                        startContent={!isUploading && <ImagePlus size={16} />}
                        isDisabled={uploadDisabled}
                        className="flex-shrink-0"
                        size="sm"
                    >
                        Добавить изображения
                    </Button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleInputChange}
                        hidden
                    />
                    <div className="text-foreground-500 text-xs">
                        {images.length} / {MAX_IMAGES_PER_MOMENT}
                    </div>
                </div>
            </Tooltip>

            {gallery}
        </>
    );
};
