import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">{label}</label>
            <input
                {...props}
                className={`w-full rounded-md p-3 font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'} ${className} `}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};
