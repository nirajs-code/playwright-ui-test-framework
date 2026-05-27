import { APIRequestContext } from "@playwright/test";
import { ApiService } from "./api.service";
import { Posts } from "src/type/posts.type";


export class PostService extends ApiService {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async getAllPosts(): Promise<Posts[]> {
        return this.get<Posts[]>('/posts');
    }

    async getPost(id: number): Promise<Posts> {
        return this.get<Posts>(`/posts/${id}`);
    }

    async createPost(payload: Posts): Promise<Posts> {
        return this.post<Posts>('/posts', payload);
    }

    async updatePost(id: number, payload: Partial<Posts>): Promise<Posts> {
        return this.put<Posts>(`/posts/${id}`, payload);
    }

    async deletePost(id: number): Promise<void> {
        return this.delete(`/posts/${id}`);
    }


}    