import { useMutation, useQuery } from '@tanstack/react-query';
import type { ApiError } from '@/api/apiClient';
import type { CreateMomentRequest, Moment } from '@/api/moments/momentsApi';
import { create, getAll } from '@/api/moments/momentsApi';

export function useCreateMomentMutation() {
    return useMutation<Moment, ApiError, CreateMomentRequest>({
        mutationFn: create,
    });
}

export function useGetAllMomentsQuery() {
    return useQuery<Moment[], ApiError>({
        queryKey: ['moments'],
        queryFn: getAll,
    });
}
