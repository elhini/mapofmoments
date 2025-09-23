import React from 'react';
import type { Metadata } from 'next';

import { AuthForm } from '@/components/auth-form/AuthForm';
import { baseMetadata } from '@/app/metadata';

export const metadata: Metadata = { ...baseMetadata, title: 'Регистрация в Map of Moments' };

export default function RegisterPage() {
    return <AuthForm mode="register" />;
}
