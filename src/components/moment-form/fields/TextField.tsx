import React from 'react';
import { Input } from '@heroui/input';

type Value = {
    name: string;
    value?: string;
};
type Props = {
    value?: string;
    onChange: ({ name, value }: Value) => void;
};

export const TextField = ({ value = '', onChange }: Props) => (
    <Input
        label="Заголовок"
        name="title"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target)}
        autoFocus={!value}
        isRequired
        errorMessage="Заголовок обязателен"
    />
);
