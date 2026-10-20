import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface BrandwatchAPIOptions {
    apiUrl?: string;
    apiHost?: string;
    apiPort?: number | string;
}

export type BrandwatchRequestConfig = Omit<AxiosRequestConfig, 'auth' | 'method'> & {
    auth?: string;
    body?: unknown;
    query?: Record<string, unknown>;
    uri?: string;
};

type RequestInput = string | BrandwatchRequestConfig;

function resolveRequestUrl(
    apiUrl: string | undefined,
    apiHost: string | undefined,
    apiPort: number | string | undefined,
    uri: string
): string {
    if (apiUrl !== undefined) {
        return new URL(uri, apiUrl).toString();
    }

    console.warn('Deprecated api, use apiUrl instead of apiHost and apiPort');
    const baseUrl = new URL('http://localhost');
    if (apiHost !== undefined) {
        baseUrl.hostname = apiHost;
    }
    if (apiPort !== undefined) {
        baseUrl.port = String(apiPort);
    }
    return new URL(uri, baseUrl).toString();
}

export class BrandwatchAPI {
    private readonly apiUrl?: string;
    private readonly apiHost?: string;
    private readonly apiPort?: number | string;
    private readonly requestOptions: BrandwatchRequestConfig;
    private readonly client: AxiosInstance;

    constructor(options: BrandwatchAPIOptions, requestOptions: BrandwatchRequestConfig = {}) {
        this.apiUrl = options.apiUrl;
        this.apiHost = options.apiHost;
        this.apiPort = options.apiPort;
        this.requestOptions = requestOptions;
        this.client = axios.create({
            timeout: 240 * 1000,
            withCredentials: false
        });
    }

    get<T = unknown>(options: RequestInput): Promise<AxiosResponse<T>> {
        return this.send<T>('GET', options);
    }

    post<T = unknown>(options: RequestInput): Promise<AxiosResponse<T>> {
        return this.send<T>('POST', options);
    }

    put<T = unknown>(options: RequestInput): Promise<AxiosResponse<T>> {
        return this.send<T>('PUT', options);
    }

    patch<T = unknown>(options: RequestInput): Promise<AxiosResponse<T>> {
        return this.send<T>('PATCH', options);
    }

    del<T = unknown>(options: RequestInput): Promise<AxiosResponse<T>> {
        return this.send<T>('DELETE', options);
    }

    private send<T>(method: string, input: RequestInput): Promise<AxiosResponse<T>> {
        const options: BrandwatchRequestConfig = typeof input === 'string'
            ? { url: input }
            : input;

        // Request-level values win, except when their value is undefined.
        const mergedOptions = { ...this.requestOptions } as BrandwatchRequestConfig;
        Object.keys(options).forEach((key) => {
            const value = (options as Record<string, unknown>)[key];
            if (value !== undefined) {
                (mergedOptions as Record<string, unknown>)[key] = value;
            }
        });

        const { auth, body, query, uri: requestUri, ...axiosOptions } = mergedOptions;
        const uri = axiosOptions.url || requestUri;
        if (!uri) {
            return Promise.reject(new TypeError('A request URL is required'));
        }

        const url = resolveRequestUrl(this.apiUrl, this.apiHost, this.apiPort, uri);
        const headers = { ...axiosOptions.headers };

        if (auth) {
            (headers as Record<string, unknown>).Authorization = `bearer ${auth}`;
        }

        const params = query === undefined
            ? axiosOptions.params
            : { ...(axiosOptions.params as Record<string, unknown> | undefined), ...query };
        const data = body === undefined ? axiosOptions.data : body;

        return this.client.request<T>({
            ...axiosOptions,
            data,
            headers,
            method,
            params,
            url
        });
    }
}
