import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createApiClient, ApiError } from '@/app/api/apiClient';

describe('apiClient', () => {
  const baseUrl = 'https://api.test';
  const client = createApiClient({ baseUrl, headers: { 'X-Default': '1' }, getAuthToken: () => 'abc' });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('builds URL with base and query params and performs GET returning JSON', async () => {
    const payload = { ok: true };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
      expect(typeof url).toBe('string');
      const u = new URL(String(url));
      expect(u.origin + u.pathname).toBe(baseUrl + '/users');
      expect(u.searchParams.get('x')).toBe('1');
      expect(u.searchParams.getAll('arr')).toEqual(['1', 'a']);
      expect(init?.method).toBe('GET');
      return new Response(JSON.stringify(payload), { status: 200, headers: { 'content-type': 'application/json' } });
    });

    const data = await client.get<typeof payload>('users', { query: { x: 1, arr: [1, 'a'] } });
    expect(data).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('POST JSON body and merges headers including auth', async () => {
    const body = { name: 'John' };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
      const headers = new Headers(init?.headers);
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(headers.get('X-Default')).toBe('1');
      expect(headers.get('X-Extra')).toBe('2');
      expect(headers.get('Authorization')).toBe('Bearer abc');
      expect(init?.body).toBe(JSON.stringify(body));
      return new Response(JSON.stringify({ id: 123 }), { status: 201, headers: { 'content-type': 'application/json' } });
    });

    const data = await client.post<{ id: number }>('users', body, { headers: { 'X-Extra': '2' } });
    expect(data.id).toBe(123);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('parses text when content-type is text/plain', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('hello', { status: 200, headers: { 'content-type': 'text/plain' } })
    );
    const data = await client.get<string>('greet');
    expect(data).toBe('hello');
  });

  it('returns undefined on 204 No Content', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(null, { status: 204 })
    );
    const data = await client.get<undefined>('empty');
    expect(data).toBeUndefined();
  });

  it('throws ApiError with parsed JSON body on non-ok status', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async () =>
      new Response(JSON.stringify({ error: 'Bad' }), { status: 400, headers: { 'content-type': 'application/json' } })
    );
    await expect(client.get('oops')).rejects.toBeInstanceOf(ApiError);
    await client.get('oops').catch((e) => {
      const err = e as ApiError<{ error: string }>;
      expect(err.status).toBe(400);
      expect(err.data?.error).toBe('Bad');
    });
  });

  it('aborts via timeout and throws ApiError with status 0', async () => {
    vi.useFakeTimers();
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation((url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) => {
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new DOMException('Request timeout', 'TimeoutError'));
        });
      });
    });

    const promise = client.get('slow', { timeoutMs: 10 });
    vi.runAllTimers();
    await expect(promise).rejects.toBeInstanceOf(ApiError);
    await promise.catch((e) => {
      const err = e as ApiError;
      expect(err.status).toBe(0);
      expect(err.statusText).toBe('TimeoutError');
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
