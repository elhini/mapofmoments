import React, { useState } from 'react';

import Image from 'next/image';

import { Card, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Alert } from '@heroui/alert';
import type { AlertProps } from '@heroui/alert';

import { getMomentImageUrl } from '@/utils/getMomentImageUrl';
import { ImageGallery } from '@/components/image-gallery/ImageGallery';
import { DeleteImageButton } from '@/components/moment-form/buttons/DeleteImageButton';

const Message = ({ color, children }: AlertProps) => (
    <Alert hideIcon className="text-foreground-500 px-0 py-1 text-xs" color={color}>
        <div className="self-center">{children}</div>
    </Alert>
);

const INITIAL_IMAGES_COUNT = 3;

type Props = {
    images: { id: string; storage_path: string }[];
    isError: boolean;
    momentId: string;
    withDelete?: boolean;
};

export const MomentImages = ({ images, isError, momentId, withDelete }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [expanded, setExpanded] = useState(false);

    if (isError) return <Message color="danger">Ошибка загрузки изображений</Message>;

    const imagesToShow = expanded ? images : images.slice(0, INITIAL_IMAGES_COUNT);

    return (
        <>
            <div className="grid min-w-[276px] grid-cols-3 gap-[6px] bg-white">
                {imagesToShow.map((img, i) => (
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
                        {!expanded && i === 2 && images.length > INITIAL_IMAGES_COUNT && (
                            <CardFooter
                                className="absolute bottom-0 justify-center bg-black/50 p-1"
                                onClick={() => setExpanded(true)}
                            >
                                <div className="text-small text-foreground-300">
                                    Ещё {images.length - INITIAL_IMAGES_COUNT}
                                </div>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
            {expanded && (
                <Button size="sm" className="self-end" onPress={() => setExpanded(false)}>
                    Закрыть галерею
                </Button>
            )}
            {selectedIndex !== null && (
                <ImageGallery
                    images={images}
                    index={selectedIndex}
                    onClose={() => setSelectedIndex(null)}
                />
            )}
        </>
    );
};
