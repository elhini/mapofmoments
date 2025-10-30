import { api } from '@/api-client/apiClient';
import type { MomentImage } from '@/types/moment-image';

export async function create(momentId: string, formData: FormData) {
    return api.post<MomentImage>(`api/moments/${momentId}/images`, formData);
}

export async function deleteMomentImage(momentId: string, imageId: string) {
    return api.delete<MomentImage>(`api/moments/${momentId}/images/${imageId}`);
}

export async function getAll(momentId: string) {
    return api.get<MomentImage[]>(`api/moments/${momentId}/images`);
}
