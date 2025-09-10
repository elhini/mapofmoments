import { Button } from '@heroui/button';
import React from 'react';

type Props = {
    onPress: () => void;
    isLoading: boolean;
};

// TODO: add icon
export const DeleteButton = ({ onPress, isLoading }: Props) => (
    <Button type="button" color="danger" onPress={onPress} isLoading={isLoading} isIconOnly>
        X
    </Button>
);
