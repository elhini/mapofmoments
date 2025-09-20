import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { Button } from '@heroui/button';
import { Trash } from 'lucide-react';

type Props = {
    onPress: () => void;
    isLoading: boolean;
};

export const DeleteButton = ({ onPress, isLoading }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <PopoverTrigger>
                <Button color="danger" isIconOnly onPress={() => setIsOpen(!isOpen)}>
                    <Trash />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="gap-2 p-2">
                <div className="text-black">Удалить этот момент?</div>
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
