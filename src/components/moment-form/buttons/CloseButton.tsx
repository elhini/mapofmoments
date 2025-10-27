import React from 'react';
import { Button } from '@heroui/button';
import { X } from 'lucide-react';

type Props = {
    onPress: () => void;
};

export const CloseBtn = ({ onPress }: Props) => (
    <Button
        onPress={onPress}
        isIconOnly
        className="absolute top-[-16px] right-[-16px] rounded-full"
        size="sm"
    >
        <X size={20} />
    </Button>
);
