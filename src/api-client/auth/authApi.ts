import { api } from '@/api-client/apiClient';

export type RegisterRequest = {
    email: string;
    password: string;
    username: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type User = {
    email: string;
    username?: string;
};

export async function register(req: RegisterRequest) {
    return api.post('api/register', req);
}

export async function login(req: LoginRequest) {
    return api.post('api/login', req);
}

export async function logout() {
    return api.post('api/logout', {});
}

export async function me() {
    return api.get<User>('api/users/me');
}
