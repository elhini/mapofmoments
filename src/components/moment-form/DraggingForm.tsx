'use client';

import React from 'react';

import { Modal, ModalContent } from '@heroui/modal';
import { Button } from '@heroui/button';
import { Check, X } from 'lucide-react';

export type DraggingFormProps = {
    submit: () => void;
    cancel: () => void;
};

export const DraggingForm: React.FC<DraggingFormProps> = ({ submit, cancel }) => {
    return (
        <Modal
            className="fixed top-[50%] w-[280px] p-3 sm:left-[50%] sm:m-0"
            isOpen
            onClose={cancel}
            hideCloseButton
            backdrop="transparent"
            classNames={{ wrapper: 'pointer-events-none', base: 'pointer-events-auto' }}
            isDismissable={false}
        >
            <ModalContent>
                <div className="flex gap-2">
                    <div className="text-foreground flex w-full p-2">Перетащите точку</div>
                    <Button onPress={submit} isIconOnly color="primary">
                        <Check />
                    </Button>
                    <Button onPress={cancel} isIconOnly>
                        <X />
                    </Button>
                </div>
            </ModalContent>
        </Modal>
    );
};
