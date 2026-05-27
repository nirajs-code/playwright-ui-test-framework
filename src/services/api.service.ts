import { APIRequestContext } from "@playwright/test";
import { envConfig } from "src/config/env.config";

class ApiService {

    constructor(protected readonly request: APIRequestContext) { }

    protected get baseUrl(): string {
        return envConfig.apiUrl;
    }

    protected url(path: string): string {
        return `${this.baseUrl}${path}`;
    }

    protected additionalHeaders: Record<string, string> = {};

    private readonly defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
    };

    private get headers(): Record<string, string> {
        return {
            ...this.defaultHeaders,
            ...this.additionalHeaders,
        }
    }

    protected get publicHeaders(): Record<string, string> {
        return {
            ...this.defaultHeaders,
            }
    }

    setToken(token: string): void {
        this.additionalHeaders['Authorization'] = `Bearer ${token}`;
    }

    private async handleResponse<T> (response: Awaited<ReturnType<APIRequestContext['get']>>, method: string, path: string): Promise<T> {
        if (!response.ok()) {
            const body = await response.text()
            throw new Error(`${method} ${path} failed — status: ${response.status()}, body: ${body}`)
        }
        return response.json() as Promise<T>;
    }

    async get<T>(path: string): Promise<T> {
        const response = await this.request.get(this.url(path), {
            headers: this.publicHeaders,
        });
        return this.handleResponse<T>(response, 'GET', path);
    }

    async post<T>(path: string, body: unknown): Promise<T> {
        const response = await this.request.post(this.url(path), {
            headers: this.publicHeaders,
            data: body,
        });
        return this.handleResponse<T>(response, 'POST', path);
    }

    async put<T>(path: string, body: unknown): Promise<T> {
        const response = await this.request.put(this.url(path), {
            headers: this.publicHeaders,
            data: body
        });
        return this.handleResponse<T>(response, 'PUT', path);
    }

    async delete(path: string): Promise<void> {
        const response = await this.request.delete(this.url(path), {
            headers: this.publicHeaders
        });
        return this.handleResponse<void>(response, 'DELETE', path);
    }
}
export { ApiService };