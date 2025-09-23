import React from 'react';
import type { Metadata } from 'next';

import { AuthForm } from '@/components/auth-form/AuthForm';
import { baseMetadata } from '@/app/metadata';

export const metadata: Metadata = { ...baseMetadata, title: 'Вход в Map of Moments' };

export default function LoginPage() {
    return <AuthForm mode="login" />;
}
