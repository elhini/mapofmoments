import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Button } from '@heroui/button';

type Props = {
    children: React.ReactNode;
    text: string;
    onPress: () => void;
    isLoading: boolean;
};

export const DeleteConfirm = ({ children, text, onPress, isLoading }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent className="gap-2 p-2">
                <div className="text-black">{text}</div>
                <div className="flex gap-2">
                    <Button color="danger" onPress={onPress} isLoading={isLoading}>
                        Да, точно
                    </Button>
                    <Button onPress={() => setIsOpen(false)}>Нет</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
