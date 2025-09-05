'use client';

import React, { createElement } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    width?: 'full' | 'auto';
    href?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    disabled,
    isLoading,
    variant = 'secondary',
    size = 'medium',
    width = 'auto',
    ...props
}) => {
    const baseClasses =
        'rounded-md font-medium transition-colors hover:cursor-pointer flex justify-center items-center gap-4';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    };
    const sizes = {
        small: 'text-sm p-2',
        medium: 'text-base p-3',
        large: 'text-lg p-4',
    };
    const widthClass = width === 'full' ? 'w-full' : 'w-auto';
    const tag = props.href ? 'a' : 'button';
    const Component = (p: ButtonProps) => createElement(tag, p, p.children);

    return (
        <Component
            {...props}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        >
            {isLoading ? (
                <>
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                    Загрузка...
                </>
            ) : (
                children
            )}
        </Component>
    );
};
