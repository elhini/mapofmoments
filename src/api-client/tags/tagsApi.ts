import { api } from '@/api-client/apiClient';
import type { Tag } from '@/types/tag';

export async function deleteTag(id: string) {
    return api.delete<Tag>(`api/tags/${id}`);
}

export async function getAll() {
    return api.get<Tag[]>('api/tags');
}
