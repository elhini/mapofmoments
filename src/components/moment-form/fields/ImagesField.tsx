import React, { useRef, useState } from 'react';

import Image from 'next/image';

import { ImagePlus } from 'lucide-react';

import { Button } from '@heroui/button';
import { Card } from '@heroui/card';

import { getMomentImageUrl } from '@/utils/getMomentImageUrl';
import {
    useGetAllMomentImagesQuery,
    useCreateMomentImageMutation,
} from '@/hooks/useMomentImagesApi';
import { DeleteImageButton } from '@/components/moment-form/buttons/DeleteImageButton';
import { ImageGallery } from '@/components/image-gallery/ImageGallery';

type Props = {
    momentId?: string;
};

const Message = ({ children }: { children: React.ReactNode }) => (
    <div className="text-foreground-500 border-foreground-200 w-full items-center rounded border-2 border-dashed p-2 text-xs">
        {children}
    </div>
);

export const ImagesField = ({ momentId = '' }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { data: images = [], isLoading, isError } = useGetAllMomentImagesQuery(momentId);
    const { mutateAsync: createImage, isPending: isCreating } =
        useCreateMomentImageMutation(momentId);

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

    if (!momentId) return <Message>Сохраните момент, чтобы добавить&nbsp;изображения</Message>;

    if (isLoading) return <Message>Загрузка изображений...</Message>;

    if (isError) return <Message>Ошибка загрузки изображений</Message>;

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

            <div className="grid w-full grid-cols-3 gap-[6px]">
                {images.map((img, i) => (
                    <Card key={img.id} className="group h-[88px] w-[88px]">
                        <Image
                            fill
                            sizes="88px"
                            alt={`Изображение №${i + 1}`}
                            src={getMomentImageUrl(img.storage_path)}
                            className="cursor-pointer object-cover"
                            onClick={() => setSelectedIndex(i)}
                        />
                        <DeleteImageButton momentId={momentId} imageId={img.id} />
                    </Card>
                ))}
                {selectedIndex !== null && (
                    <ImageGallery
                        images={images}
                        index={selectedIndex}
                        onClose={() => setSelectedIndex(null)}
                    />
                )}
            </div>
        </>
    );
};
