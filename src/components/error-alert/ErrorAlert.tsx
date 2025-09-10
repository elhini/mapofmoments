import { CircleX } from 'lucide-react';
import { Alert } from '@heroui/alert';
import React from 'react';

type Props = {
    title: string;
};

export const ErrorAlert = ({ title }: Props) => (
    <Alert
        color="danger"
        className="px-2 py-2"
        icon={<CircleX color="white" />}
        title={'Ошибка: ' + title}
    />
);
