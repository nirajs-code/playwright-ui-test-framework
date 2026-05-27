
import { APIRequestContext } from '@playwright/test';
import { ApiService } from './api.service';
import { LoginResponse } from 'src/type/auth.type';
import { envConfig } from 'src/config/env.config';

class AuthService extends ApiService {

    private token: string | null = null;

    constructor(request: APIRequestContext) {
        super(request);
    } 

    async login(username: string, password: string): Promise<LoginResponse> {
        const response = await this.request.post(this.url('/auth/login'), {
            headers: this.publicHeaders,
            data: { email: username, password },
        });

       if (!response.ok()) {
        const body = await response.text()
        throw new Error(`Login failed — status: ${response.status()}, body: ${body}`)
       }

        const data = await response.json() as LoginResponse
        this.token = data.token
        this.additionalHeaders['Authorization'] = `Bearer ${this.token}`
        return data
    }

    isLoggedIn(): boolean {
        return this.token !== null;
    }
    
    logout(): void {
        this.token = null;
        delete this.additionalHeaders['Authorization'];
    }

    async loginAsAdmin(): Promise<LoginResponse> {
        const username = process.env.ADMIN_USERNAME || envConfig.user.email;
        const password = process.env.ADMIN_PASSWORD || 'password';
        const loginResponse = await this.login(username, password);
        return loginResponse;
    }      
}


export { AuthService };