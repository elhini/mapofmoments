import React from 'react';
import { Textarea } from '@heroui/input';

type Value = {
    name: string;
    value?: string;
};
type Props = {
    value?: string;
    onChange: ({ name, value }: Value) => void;
};

export const DescriptionField = ({ value = '', onChange }: Props) => (
    <Textarea
        label="Описание"
        name="description"
        type="text"
        minRows={2}
        value={value}
        onChange={(e) => onChange(e.target)}
    />
);
