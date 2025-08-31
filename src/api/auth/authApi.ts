import { api } from '@/api/apiClient';

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
    username: string;
};

// You can refine these once the server contracts are defined
export type AuthResponse = unknown;

export async function login(req: LoginRequest) {
    return api.post<AuthResponse>('api/login', req);
}

export async function register(req: RegisterRequest) {
    return api.post<AuthResponse>('api/register', req);
}
