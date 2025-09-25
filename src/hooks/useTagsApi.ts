import { useQuery } from '@tanstack/react-query';

import type { Tag } from '@/types/tag';
import type { ApiError } from '@/api-client/apiClient';
import { getAll } from '@/api-client/tags/tagsApi';

export function useGetAllTagsQuery() {
    return useQuery<Tag[], ApiError>({
        queryKey: ['tags'],
        queryFn: getAll,
    });
}
