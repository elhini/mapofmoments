import { useMutation, useQuery } from '@tanstack/react-query';
import type { ApiError } from '@/api-client/apiClient';
import type { Moment } from '@/api-client/moments/momentsApi';
import { create, update, deleteMoment, getAll } from '@/api-client/moments/momentsApi';

export function useCreateMomentMutation() {
    return useMutation<Moment, ApiError, Moment>({
        mutationFn: create,
    });
}

export function useUpdateMomentMutation(id: string) {
    return useMutation<Moment, ApiError, Moment>({
        mutationFn: (data) => update(id, data),
    });
}

export function useDeleteMomentMutation(id: string) {
    return useMutation<Moment, ApiError, void>({
        mutationFn: () => deleteMoment(id),
    });
}

export function useGetAllMomentsQuery() {
    return useQuery<Moment[], ApiError>({
        queryKey: ['moments'],
        queryFn: getAll,
    });
}
