import { useEffect } from 'react';

import { Button } from '@heroui/button';

import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
    onPress: () => void;
    direction: 'prev' | 'next';
};

const keyMap = {
    prev: 'ArrowLeft',
    next: 'ArrowRight',
};

export const NavButton = ({ onPress, direction }: Props) => {
    const isPrev = direction === 'prev';

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === keyMap[direction]) {
                onPress();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <Button
            onPress={onPress}
            size="sm"
            variant="flat"
            isIconOnly
            className={`hover:bg-default absolute top-8 bg-white hover:opacity-100! ${isPrev ? '-left-8' : '-right-8'}`}
        >
            {isPrev ? <ArrowLeft /> : <ArrowRight />}
        </Button>
    );
};
