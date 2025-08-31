import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login, register, type LoginRequest, type RegisterRequest } from '@/api/auth/authApi';
import { api } from '@/api/apiClient';

// Mock the api client module and its default exported singleton `api`
vi.mock('@/app/api/apiClient', () => {
    return {
        api: {
            post: vi.fn(),
        },
    };
});

type Mock = ReturnType<typeof vi.fn>;

describe('authApi', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        // Re-establish the mock on restore, because restoreAllMocks resets implementations
        (api.post as unknown as Mock) = vi.fn();
    });

    it('login calls api.post with correct path and body and returns data', async () => {
        const req: LoginRequest = { email: 'a@b.com', password: 'secret' };
        const resp = { token: 't1', user: { id: 1 } };
        (api.post as unknown as Mock).mockResolvedValueOnce(resp);

        const data = await login(req);

        expect(data).toBe(resp);
        expect(api.post).toHaveBeenCalledTimes(1);
        expect(api.post).toHaveBeenCalledWith('api/login', req);
    });

    it('register calls api.post with correct path and body and returns data', async () => {
        const req: RegisterRequest = {
            email: 'new@user.com',
            password: 'p@ss',
            username: 'newbie',
        };
        const resp = { id: 123, email: req.email };
        (api.post as unknown as Mock).mockResolvedValueOnce(resp);

        const data = await register(req);

        expect(data).toBe(resp);
        expect(api.post).toHaveBeenCalledTimes(1);
        expect(api.post).toHaveBeenCalledWith('api/register', req);
    });

    it('propagates errors from underlying api.post for login', async () => {
        const req: LoginRequest = { email: 'err@user.com', password: 'bad' };
        const error = new Error('Invalid credentials');
        (api.post as unknown as Mock).mockRejectedValueOnce(error);

        await expect(login(req)).rejects.toThrow('Invalid credentials');
        expect(api.post).toHaveBeenCalledWith('api/login', req);
    });
});
