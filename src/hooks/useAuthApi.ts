import { useMutation } from '@tanstack/react-query';
import {
    login,
    logout,
    register,
    type LoginRequest,
    type RegisterRequest,
    type AuthResponse,
} from '@/api/auth/authApi';
import type { ApiError } from '@/api/apiClient';

export function useLoginMutation() {
    return useMutation<AuthResponse, ApiError, LoginRequest>({
        mutationFn: login,
    });
}

export function useLogoutMutation() {
    return useMutation<AuthResponse, ApiError, void>({
        mutationFn: logout,
    });
}

export function useRegisterMutation() {
    return useMutation<AuthResponse, ApiError, RegisterRequest>({
        mutationFn: register,
    });
}
