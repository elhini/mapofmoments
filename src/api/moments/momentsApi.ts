import { api } from '@/api/apiClient';

export type Moment = {
    id: string;
    title: string;
    description: string;
    location: { coordinates: [number, number] };
};

export type CreateMomentRequest = Omit<Moment, 'id' | 'location'> & {
    location: { lng: number; lat: number };
};

export async function create(req: CreateMomentRequest) {
    return api.post<Moment>('api/moments', req);
}

export async function getAll() {
    return api.get<Moment[]>('api/moments');
}
