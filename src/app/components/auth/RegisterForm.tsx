import React from 'react';
import { AuthForm } from './AuthForm';
import type { AuthFormProps } from '../../types/auth';

export const RegisterForm: React.FC<AuthFormProps> = (props) => {
    return <AuthForm mode="register" {...props} />;
};
