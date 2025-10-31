import React from 'react';
import { Button } from '@heroui/button';
import { Check } from 'lucide-react';

type Props = {
    text: string;
    isLoading: boolean;
};

export const SubmitButton = ({ text, isLoading }: Props) => (
    <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
        startContent={!isLoading && <Check size={20} />}
    >
        {text}
    </Button>
);
