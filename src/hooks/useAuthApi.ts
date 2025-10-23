import { useMutation, useQuery } from '@tanstack/react-query';

import type { AuthRequest, User } from '@/api-client/auth/authApi';
import type { ApiError } from '@/api-client/apiClient';
import { register, login, logout, me } from '@/api-client/auth/authApi';

export function useRegisterMutation() {
    return useMutation<unknown, ApiError, AuthRequest>({
        mutationFn: register,
    });
}

export function useLoginMutation() {
    return useMutation<unknown, ApiError, AuthRequest>({
        mutationFn: login,
    });
}

export function useLogoutMutation() {
    return useMutation<unknown, ApiError, void>({
        mutationFn: logout,
    });
}

export function useMeQuery(enabled: boolean) {
    return useQuery<User, ApiError>({
        queryKey: ['me'],
        queryFn: me,
        enabled,
    });
}
