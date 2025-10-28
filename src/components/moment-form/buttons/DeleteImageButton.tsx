import React from 'react';
import { Button } from '@heroui/button';
import { Trash } from 'lucide-react';

import { useDeleteMomentImageMutation } from '@/hooks/useMomentImagesApi';
import { DeleteConfirm } from '@/components/delete-confirm/DeleteConfirm';

type Props = {
    momentId: string;
    imageId: string;
};

export const DeleteImageButton = ({ momentId, imageId }: Props) => {
    const { mutateAsync: deleteImage, isPending: isDeleting } =
        useDeleteMomentImageMutation(momentId);
    const onPress = () => deleteImage(imageId);

    return (
        <DeleteConfirm text="Удалить это изображение?" onPress={onPress} isLoading={isDeleting}>
            <Button
                isIconOnly
                size="sm"
                className="absolute right-0 opacity-0 group-hover:opacity-100"
            >
                <Trash size={16} />
            </Button>
        </DeleteConfirm>
    );
};
