import React, { useRef } from 'react';

import Image from 'next/image';

import { Trash, ImagePlus } from 'lucide-react';

import { Button } from '@heroui/button';
import { Card } from '@heroui/card';

import { supabaseUrl } from '@/utils/supabaseConfig';
import {
    useGetAllMomentImagesQuery,
    useCreateMomentMutation,
    useDeleteMomentMutation,
} from '@/hooks/useMomentImagesApi';

type Props = {
    momentId?: string;
};

export const ImagesField = ({ momentId }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { data: images = [], isLoading, isError } = useGetAllMomentImagesQuery(momentId || '');
    const { mutateAsync: createImage, isPending: isCreating } = useCreateMomentMutation(
        momentId || '',
    );
    const { mutateAsync: deleteImage, isPending: isDeleting } = useDeleteMomentMutation(
        momentId || '',
    );

    const getPublicUrl = (path: string) => {
        // moment_images is bucket name
        return `${supabaseUrl}/storage/v1/object/public/moment_images/${encodeURIComponent(path)}`;
    };

    const onFilesSelected = async (files: FileList | null) => {
        if (!files || !momentId) return;
        for (const file of Array.from(files)) {
            const fd = new FormData();
            fd.append('file', file);
            await createImage(fd);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilesSelected(e.target.files);
        // reset input so same file can be selected again
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!momentId) return;
        onFilesSelected(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    if (!momentId)
        return (
            <div className="text-foreground-500 border-foreground-200 w-full items-center rounded border-2 border-dashed p-2 text-xs">
                Сохраните момент, чтобы добавить&nbsp;изображения
            </div>
        );

    if (isLoading) {
        return (
            <div className="text-foreground-500 border-foreground-200 w-full items-center rounded border-2 border-dashed p-2 text-xs">
                Загрузка изображений...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-foreground-500 border-foreground-200 w-full items-center rounded border-2 border-dashed p-2 text-xs">
                Ошибка загрузки изображений
            </div>
        );
    }

    return (
        <>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-foreground-200 flex w-full items-center gap-2 rounded border-2 border-dashed p-2"
            >
                <Button
                    onPress={() => inputRef.current?.click()}
                    isLoading={isCreating}
                    startContent={!isCreating && <ImagePlus size={16} />}
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
                <div className="text-foreground-500 text-xs">Перетащить тоже&nbsp;можно</div>
            </div>

            <div className="grid w-full grid-cols-3 gap-2">
                {images.map((img, i) => (
                    <Card key={img.id} className="group h-[87px]">
                        <Image
                            fill
                            alt={`Изображение №${i + 1}`}
                            src={getPublicUrl(img.storage_path)}
                            className="h-24 w-full object-cover"
                        />
                        <Button
                            isIconOnly
                            size="sm"
                            className="absolute right-0 hidden group-hover:flex"
                            onPress={() => deleteImage(img.id)}
                            isLoading={isDeleting}
                        >
                            <Trash size={16} />
                        </Button>
                    </Card>
                ))}
            </div>
        </>
    );
};
