import React from 'react';
import { Button } from '@heroui/button';
import { MapPinPen } from 'lucide-react';

type Props = {
    onPress: () => void;
};

export const EnableDraggingButton = ({ onPress }: Props) => (
    <Button onPress={onPress} isIconOnly>
        <MapPinPen />
    </Button>
);
