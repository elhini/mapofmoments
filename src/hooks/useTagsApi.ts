import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Tag } from '@/types/tag';
import type { ApiError } from '@/api-client/apiClient';
import { update, deleteTag, getAll, share } from '@/api-client/tags/tagsApi';

export function useUpdateTagMutation(id: string) {
    const queryClient = useQueryClient();

    return useMutation<Tag, ApiError, Tag>({
        mutationFn: (data) => update(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tags'] }),
    });
}

export function useDeleteTagMutation(id: string) {
    const queryClient = useQueryClient();

    return useMutation<Tag, ApiError, unknown>({
        mutationFn: () => deleteTag(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tags'] }),
    });
}

export function useShareTagMutation(id: string) {
    const queryClient = useQueryClient();

    return useMutation<string, ApiError, unknown>({
        mutationFn: () => share(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tags'] }),
    });
}

export function useGetAllTagsQuery() {
    return useQuery<Tag[], ApiError>({
        queryKey: ['tags'],
        queryFn: getAll,
    });
}
