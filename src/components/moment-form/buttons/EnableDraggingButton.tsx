import React from 'react';
import { Button } from '@heroui/button';
import { Move } from 'lucide-react';

type Props = {
    onPress: () => void;
};

export const EnableDraggingButton = ({ onPress }: Props) => (
    <Button onPress={onPress} isIconOnly>
        <Move size={20} />
    </Button>
);
