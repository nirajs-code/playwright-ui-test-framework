import { expect, test } from "@fixtures/base.fixture";

test('get posts @api', async ({ postService }) => {
    const posts = await postService.getPost(1);
    console.log('Posts:', posts);
    expect(posts).toBeDefined();
    expect(posts.id).toBe(1);
});

test('create post @api', async ({ postsFactory }) => {
    const post = await postsFactory.create({ title: 'specific title' });
    console.log('Created Post:', post);
    expect(post).toBeDefined();
    expect(post.title).toBe('specific title');
});