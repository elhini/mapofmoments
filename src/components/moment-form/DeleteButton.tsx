import React from 'react';
import { Button } from '@heroui/button';
import { Trash } from 'lucide-react';

type Props = {
    onPress: () => void;
    isLoading: boolean;
};

export const DeleteButton = ({ onPress, isLoading }: Props) => (
    <Button type="button" color="danger" onPress={onPress} isLoading={isLoading} isIconOnly>
        <Trash />
    </Button>
);
