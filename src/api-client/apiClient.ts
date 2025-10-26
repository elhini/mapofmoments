/*
A lightweight API client wrapper around fetch with:
- Base URL and default headers
- Typed request/response via generics
- Query params builder
- JSON body handling
- Response parsing by content-type (JSON, text, blob, empty)
- Unified ApiError class
- Timeout support using AbortController
- Narrowed type for 204/empty responses

Intended for use with React Query.
*/

export type ApiClientOptions = {
    baseUrl?: string;
    headers?: HeadersInit | (() => HeadersInit);
    getAuthToken?: () => string | undefined | null;
    timeoutMs?: number; // default per-request timeout if isn't provided in call
};

export type Primitive = string | number | boolean | null | undefined;
export type QueryValue = Primitive | Primitive[] | Record<string, unknown>;
export type QueryParams = Record<string, QueryValue>;

export type RequestOptions = {
    method?: HttpMethod;
    headers?: HeadersInit;
    query?: QueryParams | URLSearchParams | undefined;
    body?: unknown; // will JSON.stringify by default when object
    signal?: AbortSignal;
    timeoutMs?: number; // override default
    parseAs?: 'json' | 'text' | 'blob' | 'auto'; // default auto by content-type
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export class ApiError<T = unknown> extends Error {
    readonly status: number;
    readonly statusText: string;
    readonly url: string;
    readonly data?: T;
    readonly headers: Headers;

    constructor(params: {
        message: string;
        status: number;
        statusText: string;
        url: string;
        data?: T;
        headers: Headers;
    }) {
        super(params.message);
        this.name = 'ApiError';
        this.status = params.status;
        this.statusText = params.statusText;
        this.url = params.url;
        this.data = params.data;
        this.headers = params.headers;
    }
}

function isObject(value: unknown): value is Record<string, unknown> {
    return value != null && typeof value === 'object' && !Array.isArray(value);
}

function buildQuery(query?: RequestOptions['query']): string {
    if (!query) return '';
    if (query instanceof URLSearchParams) {
        const s = query.toString();
        return s ? `?${s}` : '';
    }
    const params = new URLSearchParams();
    for (const [key, raw] of Object.entries(query)) {
        if (raw === undefined || raw === null) continue;
        if (Array.isArray(raw)) {
            for (const v of raw) params.append(key, String(v));
        } else if (isObject(raw)) {
            params.append(key, JSON.stringify(raw));
        } else {
            params.append(key, String(raw));
        }
    }
    const s = params.toString();
    return s ? `?${s}` : '';
}

function resolveHeaders(h?: HeadersInit | (() => HeadersInit)): HeadersInit | undefined {
    if (!h) return undefined;
    return typeof h === 'function' ? h() : h;
}

export type ApiClient = ReturnType<typeof createApiClient>;

export function createApiClient(opts: ApiClientOptions = {}) {
    const baseUrl = opts.baseUrl?.replace(/\/$/, '') ?? '';
    const defaultHeadersResolver = () =>
        ({
            ...resolveHeaders(opts.headers),
            ...(opts.getAuthToken ? { Authorization: `Bearer ${opts.getAuthToken()}` } : {}),
        }) as HeadersInit;

    async function parseResponse<R>(
        res: Response,
        parseAs: RequestOptions['parseAs'] | undefined,
    ): Promise<{ data: R | undefined; isEmpty: boolean }> {
        if (res.status === 204 || res.headers.get('content-length') === '0')
            return { data: undefined, isEmpty: true };
        const ct = res.headers.get('content-type') || '';
        const mode =
            parseAs && parseAs !== 'auto'
                ? parseAs
                : ct.includes('application/json')
                  ? 'json'
                  : ct.startsWith('text/')
                    ? 'text'
                    : 'blob';
        if (mode === 'json') {
            try {
                const json = (await res.json()) as R;
                return { data: json, isEmpty: false };
            } catch {
                // if body is not JSON
                return { data: undefined, isEmpty: true };
            }
        }
        if (mode === 'text') {
            const text = (await res.text()) as unknown as R;
            return { data: text, isEmpty: false };
        }
        const blob = (await res.blob()) as unknown as R;
        return { data: blob, isEmpty: false };
    }

    function withTimeout(signal: AbortSignal | undefined, timeoutMs?: number) {
        if (!timeoutMs) return { signal, cleanup: () => {} } as const;
        const controller = new AbortController();
        const timer = setTimeout(
            () => controller.abort(new DOMException('Request timeout', 'TimeoutError')),
            timeoutMs,
        );

        const onAbort = () =>
            controller.abort(signal?.reason ?? new DOMException('Aborted', 'AbortError'));
        signal?.addEventListener('abort', onAbort);

        const cleanup = () => {
            clearTimeout(timer);
            signal?.removeEventListener('abort', onAbort);
        };

        return { signal: controller.signal, cleanup } as const;
    }

    async function request<R = unknown>(path: string, options: RequestOptions = {}): Promise<R> {
        const { method = 'GET', headers, query, body, signal, timeoutMs, parseAs } = options;
        const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}${buildQuery(query)}`;

        const defaultHeaders = defaultHeadersResolver();
        const finalHeaders = new Headers(defaultHeaders);
        if (headers) {
            const extra = new Headers(headers);
            extra.forEach((v, k) => finalHeaders.set(k, v));
        }

        let payload: BodyInit | undefined = undefined;
        if (body !== undefined && body !== null && method !== 'GET' && method !== 'HEAD') {
            if (
                body instanceof FormData ||
                body instanceof URLSearchParams ||
                body instanceof Blob
            ) {
                // Let browser set appropriate content-type
                payload = body as BodyInit;
            } else if (isObject(body) || Array.isArray(body)) {
                if (!finalHeaders.has('Content-Type'))
                    finalHeaders.set('Content-Type', 'application/json');
                payload = JSON.stringify(body);
            } else if (typeof body === 'string') {
                if (!finalHeaders.has('Content-Type'))
                    finalHeaders.set('Content-Type', 'text/plain;charset=UTF-8');
                payload = body;
            } else {
                payload = body as BodyInit;
            }
        }

        const { signal: timeoutSignal, cleanup } = withTimeout(signal, timeoutMs ?? opts.timeoutMs);

        let res: Response;
        try {
            res = await fetch(url, {
                method,
                headers: finalHeaders,
                body: payload,
                signal: timeoutSignal,
                credentials: 'include',
            });
        } catch (e: unknown) {
            cleanup();
            const err = e as { name?: string; message?: string } | undefined;
            if (err?.name === 'AbortError' || err?.name === 'TimeoutError') {
                throw new ApiError({
                    message: err.message || 'Request aborted',
                    status: 0,
                    statusText: err.name ?? 'AbortError',
                    url,
                    headers: new Headers(),
                    data: undefined,
                });
            }
            throw e;
        }

        cleanup();

        if (!res.ok) {
            // Parse error body once based on content-type
            let errorData: unknown = undefined;
            try {
                const ct = res.headers.get('content-type') || '';
                if (ct.includes('application/json')) {
                    errorData = await res.json().catch(() => undefined);
                } else if (ct.startsWith('text/')) {
                    errorData = await res.text().catch(() => undefined);
                } else {
                    errorData = await res.blob().catch(() => undefined);
                }
            } catch {
                // ignore
            }
            const message =
                (typeof errorData === 'string' && errorData) ||
                (errorData ? JSON.stringify(errorData) : res.statusText) ||
                'Request failed';
            throw new ApiError({
                message,
                status: res.status,
                statusText: res.statusText,
                url,
                data: errorData as R,
                headers: res.headers,
            });
        }

        if (res.redirected) {
            window.location.href = res.url;
        }

        const { data } = await parseResponse<R>(res, parseAs);
        return data as R;
    }

    return {
        request,
        get: <R = unknown>(path: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) =>
            request<R>(path, { ...options, method: 'GET' }),
        delete: <R = unknown>(
            path: string,
            options: Omit<RequestOptions, 'method' | 'body'> = {},
        ) => request<R>(path, { ...options, method: 'DELETE' }),
        post: <R = unknown>(
            path: string,
            body?: unknown,
            options: Omit<RequestOptions, 'method' | 'body'> = {},
        ) => request<R>(path, { ...options, method: 'POST', body }),
        put: <R = unknown>(
            path: string,
            body?: unknown,
            options: Omit<RequestOptions, 'method' | 'body'> = {},
        ) => request<R>(path, { ...options, method: 'PUT', body }),
        patch: <R = unknown>(
            path: string,
            body?: unknown,
            options: Omit<RequestOptions, 'method' | 'body'> = {},
        ) => request<R>(path, { ...options, method: 'PATCH', body }),
    };
}

// A tiny helper for React Query to build a queryFn
export function makeQueryFn(client: ApiClient) {
    return function queryFn<R = unknown>(path: string, options?: Omit<RequestOptions, 'method'>) {
        return client.get<R>(path, options);
    };
}

// Default singleton client (optional)
export const api = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
});
