import type { ChangeEvent } from 'react';

import { Input } from '@heroui/input';

interface Props {
    type: 'email' | 'password';
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput = ({ type, value, onChange }: Props) => {
    const isEmail = type === 'email';
    const hoverOutlineColor = isEmail
        ? 'group-hover:outline-sky-300'
        : 'group-hover:outline-emerald-300';
    const inputWrapperCNs = 'bg-white! group-hover:outline-1 ' + hoverOutlineColor;

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
            classNames={{ inputWrapper: inputWrapperCNs }}
        />
    );
};
