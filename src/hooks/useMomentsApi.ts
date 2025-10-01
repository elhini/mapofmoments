import { useMutation, useQuery } from '@tanstack/react-query';

import type { Moment } from '@/types/moment';
import type { ApiError } from '@/api-client/apiClient';
import { create, update, deleteMoment, getAll, getShared } from '@/api-client/moments/momentsApi';

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

export function useGetSharedMomentsQuery(tagPublicId: string) {
    return useQuery<Moment[], ApiError>({
        queryKey: ['shared-moments'],
        queryFn: () => getShared(tagPublicId),
    });
}
