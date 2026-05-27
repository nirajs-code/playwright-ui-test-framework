import { faker } from "@faker-js/faker";
import { Posts } from "src/type/posts.type";

export class PostsBuilder {

    private data: Posts = {        
        userId: faker.number.int({ min: 1, max: 10 }),
        id: faker.number.int({ min: 1, max: 100 }),
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph()
     };

     withUserId(userId: number): this {
        this.data.userId = userId;
        return this;
     }

     withId(id: number): this {
        this.data.id = id;
        return this;
     }

     withTitle(title: string): this {
        this.data.title = title;
        return this;
     }

     withBody(body: string): this {
        this.data.body = body;
        return this;
     }

     build(): Posts {
        return { ...this.data };
     }
}