import { api } from '@/api-client/apiClient';

// TODO: move to types
export type AuthRequest = {
    email: string;
    password: string;
};

export type User = {
    email: string;
};

export async function register(req: AuthRequest) {
    return api.post('api/register', req);
}

export async function login(req: AuthRequest) {
    return api.post('api/login', req);
}

export async function logout() {
    return api.post('api/logout', {});
}

export async function me() {
    return api.get<User>('api/users/me');
}
