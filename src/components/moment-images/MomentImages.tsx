import React, { useState } from 'react';

import Image from 'next/image';

import { Card } from '@heroui/card';
import { Alert } from '@heroui/alert';
import type { AlertProps } from '@heroui/alert';

import { getMomentImageUrl } from '@/utils/getMomentImageUrl';
import { useGetAllMomentImagesQuery } from '@/hooks/useMomentImagesApi';
import { ImageGallery } from '@/components/image-gallery/ImageGallery';
import { DeleteImageButton } from '@/components/moment-form/buttons/DeleteImageButton';

const Message = ({ color, children }: AlertProps) => (
    <Alert hideIcon className="text-foreground-500 px-0 py-1 text-xs" color={color}>
        <div className="self-center">{children}</div>
    </Alert>
);

type Props = {
    momentId: string;
    withDelete?: boolean;
};

export const MomentImages = ({ momentId, withDelete }: Props) => {
    const { data: images = [], isError } = useGetAllMomentImagesQuery(momentId);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    if (isError) return <Message color="danger">Ошибка загрузки изображений</Message>;

    return (
        <div className="grid min-w-[276px] grid-cols-3 gap-[6px]">
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
                    {withDelete && momentId && (
                        <DeleteImageButton momentId={momentId} imageId={img.id} />
                    )}
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
    );
};
