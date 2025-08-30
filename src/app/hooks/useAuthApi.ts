import { useMutation } from '@tanstack/react-query';
import {
    login,
    register,
    type LoginRequest,
    type RegisterRequest,
    type AuthResponse,
} from '@/app/api/auth/authApi';
import type { ApiError } from '@/app/api/apiClient';

export function useLoginMutation() {
    return useMutation<AuthResponse, ApiError, LoginRequest>({
        mutationFn: login,
    });
}

export function useRegisterMutation() {
    return useMutation<AuthResponse, ApiError, RegisterRequest>({
        mutationFn: register,
    });
}
