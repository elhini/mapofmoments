import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    width?: 'full' | 'auto';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    isLoading,
    variant = 'secondary',
    size = 'medium',
    width = 'auto',
    className = '',
    disabled,
    ...props
}) => {
    const baseClasses =
        'rounded-md font-medium transition-colors hover:cursor-pointer flex justify-center items-center gap-4';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    };
    const sizes = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    };
    const paddings = {
        small: 'p-2',
        medium: 'p-3',
        large: 'p-4',
    };
    const widthClass = width === 'full' ? 'w-full' : 'w-auto';

    return (
        <button
            {...props}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${paddings[size]} ${widthClass} ${className}`}
        >
            {isLoading ? (
                <>
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                    Загрузка...
                </>
            ) : (
                children
            )}
        </button>
    );
};
