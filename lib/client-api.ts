// Client-side fetch helper — semua request melalui Next.js API proxy
// Token otomatis di-attach oleh proxy dari HttpOnly cookie

const PROXY_BASE = "/api/proxy"

interface FetchOptions {
    method?: string
    body?: unknown
    headers?: Record<string, string>
}

async function clientFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options

    const fetchOptions: RequestInit = {
        method,
        headers: {
            ...headers,
        },
    }

    if (body) {
        if (body instanceof FormData) {
            // FormData — biarkan browser set Content-Type dengan boundary
            fetchOptions.body = body
        } else {
            fetchOptions.headers = {
                "Content-Type": "application/json",
                ...headers,
            }
            fetchOptions.body = JSON.stringify(body)
        }
    }

    const response = await fetch(`${PROXY_BASE}${path}`, fetchOptions)

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error = new Error(errorData.message || `Request failed: ${response.status}`)
            ; (error as any).status = response.status
            ; (error as any).data = errorData
        throw error
    }

    return response.json()
}

export const clientApi = {
    get: <T = any>(path: string) => clientFetch<T>(path),

    post: <T = any>(path: string, body?: unknown) =>
        clientFetch<T>(path, { method: "POST", body }),

    put: <T = any>(path: string, body?: unknown) =>
        clientFetch<T>(path, { method: "PUT", body }),

    patch: <T = any>(path: string, body?: unknown) =>
        clientFetch<T>(path, { method: "PATCH", body }),

    delete: <T = any>(path: string, body?: unknown) =>
        clientFetch<T>(path, { method: "DELETE", body }),
}
