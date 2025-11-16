import type { ChangeEvent } from 'react';

import { Input } from '@heroui/input';

interface Props {
    type: 'email' | 'password';
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput = ({ type, value, onChange }: Props) => {
    const isEmail = type === 'email';
    const outlineColor = isEmail ? 'outline-sky-300 ' : 'outline-emerald-300';
    const hoverCNs = 'group-hover:outline-1 group-hover:' + outlineColor;
    const ringColor = isEmail ? 'ring-sky-500' : 'ring-emerald-500';
    const focusCNs = 'group-data-[focus=true]:ring-2 group-data-[focus=true]:' + ringColor;

    return (
        <Input
            type={type}
            name={type}
            label={isEmail ? 'Email' : 'Пароль'}
            value={value}
            onChange={onChange}
            isRequired
            autoFocus={isEmail}
            className="group"
            classNames={{ inputWrapper: 'bg-white! ' + hoverCNs + ' ' + focusCNs }}
        />
    );
};
