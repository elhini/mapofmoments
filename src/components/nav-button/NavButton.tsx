import { Button } from '@heroui/button';

import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
    onPress: () => void;
    direction: 'prev' | 'next';
};

export const NavButton = ({ onPress, direction }: Props) => {
    const isPrev = direction === 'prev';

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
