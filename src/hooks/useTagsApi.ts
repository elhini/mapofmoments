import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Tag } from '@/types/tag';
import type { ApiError } from '@/api-client/apiClient';
import { deleteTag, getAll } from '@/api-client/tags/tagsApi';

export function useDeleteTagMutation(id: string) {
    const queryClient = useQueryClient();

    return useMutation<Tag, ApiError, unknown>({
        mutationFn: () => deleteTag(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tags'] }),
    });
}

export function useGetAllTagsQuery() {
    return useQuery<Tag[], ApiError>({
        queryKey: ['tags'],
        queryFn: getAll,
    });
}
