'use client';

import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import type { AuthFormData } from '../types/auth';

export default function RegisterPage() {
  const handleRegister = async (data: AuthFormData) => {
    console.log('Register data:', data);
  };

  return <RegisterForm onSubmit={handleRegister} />;
}