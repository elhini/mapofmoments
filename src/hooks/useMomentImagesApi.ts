import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { MomentImage } from '@/types/moment-image';
import type { ApiError } from '@/api-client/apiClient';
import {
    create,
    deleteMomentImage,
    getAll,
    getShared,
} from '@/api-client/moment-images/momentImagesApi';
import { showError } from '@/utils/showError';

export function useCreateMomentImageMutation(momentId: string) {
    const queryClient = useQueryClient();

    return useMutation<MomentImage, ApiError, FormData>({
        mutationFn: (formData) => create(momentId, formData),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['moment-images', momentId] }),
        onError: (error) => showError({ title: 'Ошибка загрузки изображения: ' + error.message }),
    });
}

export function useDeleteMomentImageMutation(momentId: string) {
    const queryClient = useQueryClient();

    return useMutation<MomentImage, ApiError, string>({
        mutationFn: (imageId) => deleteMomentImage(momentId, imageId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['moment-images', momentId] }),
        onError: (error) => showError({ title: 'Ошибка удаления изображения: ' + error.message }),
    });
}

export function useGetAllMomentImagesQuery(momentId: string) {
    return useQuery<MomentImage[], ApiError>({
        queryKey: ['moment-images', momentId],
        queryFn: () => getAll(momentId),
        enabled: !!momentId,
    });
}

export function useGetSharedMomentImagesQuery(momentId: string) {
    return useQuery<MomentImage[], ApiError>({
        queryKey: ['shared-images', momentId],
        queryFn: () => getShared(momentId),
        enabled: !!momentId,
    });
}
