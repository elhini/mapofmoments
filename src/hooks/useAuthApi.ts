import { useMutation, useQuery } from '@tanstack/react-query';
import {
    login,
    logout,
    register,
    me,
    type LoginRequest,
    type RegisterRequest,
    type AuthResponse,
    type User,
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

export function useMeQuery() {
    return useQuery<User, ApiError>({
        queryKey: ['me'],
        queryFn: me,
    });
}
