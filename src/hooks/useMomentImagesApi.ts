import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { MomentImage } from '@/types/moment';
import type { ApiError } from '@/api-client/apiClient';
import { create, deleteMomentImage, getAll } from '@/api-client/moment_images/momentImagesApi';

export function useCreateMomentMutation(momentId: string) {
    const queryClient = useQueryClient();

    return useMutation<MomentImage, ApiError, FormData>({
        mutationFn: (formData) => create(momentId, formData),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['moment-images', momentId] }),
    });
}

export function useDeleteMomentMutation(momentId: string) {
    const queryClient = useQueryClient();

    return useMutation<MomentImage, ApiError, string>({
        mutationFn: (imageId) => deleteMomentImage(momentId, imageId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['moment-images', momentId] }),
    });
}

export function useGetAllMomentImagesQuery(momentId: string) {
    return useQuery<MomentImage[], ApiError>({
        queryKey: ['moment-images', momentId],
        queryFn: () => getAll(momentId),
        enabled: !!momentId,
    });
}
