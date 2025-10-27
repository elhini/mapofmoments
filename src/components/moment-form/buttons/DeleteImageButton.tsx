import React from 'react';

import { Button } from '@heroui/button';

import { Trash } from 'lucide-react';

import { useDeleteMomentMutation } from '@/hooks/useMomentImagesApi';

type Props = {
    momentId: string;
    imageId: string;
};

export const DeleteImageButton = ({ momentId, imageId }: Props) => {
    const { mutateAsync: deleteImage, isPending: isDeleting } = useDeleteMomentMutation(momentId);

    return (
        <Button
            isIconOnly
            size="sm"
            className="absolute right-0 hidden group-hover:flex"
            onPress={() => deleteImage(imageId)}
            isLoading={isDeleting}
        >
            <Trash size={16} />
        </Button>
    );
};
