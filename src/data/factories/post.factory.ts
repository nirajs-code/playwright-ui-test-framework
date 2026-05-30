import { APIRequestContext } from "@playwright/test";
import { PostsBuilder } from "../builders/posts.builder";
import { PostService } from "../../services/post.service";
import { Posts } from "../../type/posts.type";

export class PostsFactory {

    private readonly postService: PostService;
    private createdPosts: Posts[] = [];

    constructor(request: APIRequestContext) {
        this.postService = new PostService(request);
    }

    async create(overrides?: Partial<Posts>): Promise<Posts> {
        const payload = new PostsBuilder().build();
        const merged = {...payload, ...overrides};
        const post = await this.postService.createPost(merged);
        this.createdPosts.push(post);
        return post;
    }

    async createMany(count: number, overrides?: Partial<Posts>): Promise<Posts[]> {
        const posts = await Promise.all(
            Array.from( {length: count}, () => this.create(overrides))
        );
        return posts;
    }

    async cleanup(): Promise<void> {
        await Promise.all(this.createdPosts.map(post => this.postService.deletePost(post.id)));
        this.createdPosts = [];
    }
}