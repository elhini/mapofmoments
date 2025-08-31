import React from 'react';
import { AuthForm } from './AuthForm';
import type { AuthFormProps } from '@/types/auth';

export const LoginForm: React.FC<AuthFormProps> = (props) => {
    return <AuthForm mode="login" {...props} />;
};
