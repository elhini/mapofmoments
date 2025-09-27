import React from 'react';
import { Checkbox } from '@heroui/checkbox';

type Value = {
    name: string;
    value?: boolean;
};
type Props = {
    value?: boolean;
    onChange: ({ name, value }: Value) => void;
};

export const NotExactDateField = ({ value = false, onChange }: Props) => (
    <Checkbox
        name="not_exact_date"
        isSelected={value}
        onValueChange={(v) => onChange({ name: 'not_exact_date', value: v })}
        className="m-0 h-5 self-center p-0"
        size="sm"
    >
        Примерная дата
    </Checkbox>
);
