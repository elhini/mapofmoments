import { api } from '@/api-client/apiClient';
import type { Moment } from '@/types/moment';

export async function create(data: Moment) {
    return api.post<Moment>('api/moments', data);
}

export async function update(id: string, data: Moment) {
    return api.put<Moment>(`api/moments/${id}`, data);
}

export async function deleteMoment(id: string) {
    return api.delete<Moment>(`api/moments/${id}`);
}

export async function getAll() {
    return api.get<Moment[]>('api/moments');
}
