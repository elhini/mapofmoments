import { useMutation, useQuery } from '@tanstack/react-query';
import type { ApiError } from '@/api-client/apiClient';
import type { MomentFormRequest, Moment } from '@/api-client/moments/momentsApi';
import { create, update, getAll } from '@/api-client/moments/momentsApi';

export function useCreateMomentMutation() {
    return useMutation<Moment, ApiError, MomentFormRequest>({
        mutationFn: create,
    });
}

export function useUpdateMomentMutation(id: string) {
    return useMutation<Moment, ApiError, MomentFormRequest>({
        mutationFn: (data) => update(id, data),
    });
}

export function useGetAllMomentsQuery() {
    return useQuery<Moment[], ApiError>({
        queryKey: ['moments'],
        queryFn: getAll,
    });
}
