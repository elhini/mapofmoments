import { api } from '@/api-client/apiClient';

export type Moment = {
    id: string;
    title: string;
    description?: string;
    location: { coordinates: [number, number] };
};

export type MomentFormRequest = Omit<Moment, 'id' | 'location'> & {
    location?: { lng: number; lat: number };
};

export async function create(data: MomentFormRequest) {
    return api.post<Moment>('api/moments', data);
}

export async function update(id: string, data: MomentFormRequest) {
    return api.put<Moment>(`api/moments/${id}`, data);
}

export async function getAll() {
    return api.get<Moment[]>('api/moments');
}
