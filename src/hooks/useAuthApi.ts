import { useMutation, useQuery } from '@tanstack/react-query';
import {
    register,
    login,
    logout,
    me,
    type RegisterRequest,
    type LoginRequest,
    type User,
} from '@/api-client/auth/authApi';
import type { ApiError } from '@/api-client/apiClient';

export function useRegisterMutation() {
    return useMutation<unknown, ApiError, RegisterRequest>({
        mutationFn: register,
    });
}

export function useLoginMutation() {
    return useMutation<unknown, ApiError, LoginRequest>({
        mutationFn: login,
    });
}

export function useLogoutMutation() {
    return useMutation<unknown, ApiError, void>({
        mutationFn: logout,
    });
}

export function useMeQuery() {
    return useQuery<User, ApiError>({
        queryKey: ['me'],
        queryFn: me,
    });
}
