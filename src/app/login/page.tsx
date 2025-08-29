'use client';

import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { AuthFormData } from '../types/auth';

export default function LoginPage() {
  const handleLogin = async (data: AuthFormData) => {
    console.log('Login data:', data);
  };

  return <LoginForm onSubmit={handleLogin} />;
}