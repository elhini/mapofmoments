import React from 'react';
import { Button } from '@heroui/button';
import { Trash } from 'lucide-react';

import { DeleteConfirm } from '@/components/delete-confirm/DeleteConfirm';

type Props = {
    onPress: () => void;
    isLoading: boolean;
};

export const DeleteButton = ({ onPress, isLoading }: Props) => {
    return (
        <DeleteConfirm text="Удалить этот момент?" onPress={onPress} isLoading={isLoading}>
            <Button isIconOnly color="danger">
                <Trash size={20} />
            </Button>
        </DeleteConfirm>
    );
};
