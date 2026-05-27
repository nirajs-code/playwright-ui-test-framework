import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/home.page';
import { DocsPage } from '@pages/docs.page';
import { ApiService } from 'src/services/api.service';
import { AuthService } from 'src/services/auth.service';
import { PostService } from 'src/services/post.service';
import { PostsFactory } from 'src/data/factories/post.factory';
import { userInfo } from 'node:os';

type PageFixtures = {
  homePage: HomePage;
  docsPage: DocsPage;
};

type AuthFixtures = {
  asGuest: void;
  asUser: void;
};

type ApiFixtures = {
  apiService: AuthService;
  authService: AuthService;
  postService: PostService;
};

type factoryFixtures = {
  postsFactory: PostsFactory;
}

export const test = base.extend<PageFixtures & AuthFixtures & ApiFixtures & factoryFixtures>({
  
    homePage: async ({ page }, use) => {
      const homePage = new HomePage(page);
      await use(homePage);
    },

    docsPage: async ({ page }, use) => {
      const docsPage = new DocsPage(page);
      await use(docsPage);
    },

    // explicit no-auth — test runs as a guest
    asGuest: async ({ browser }, use) => {
      const context = await browser.newContext()   // fresh context, no storage state
      await use()
      await context.close()
    },

    // logged in — storage state already loaded via playwright.config.ts
    asUser: async ({}, use) => {
      await use()   // nothing to do — config already loaded storage state
    },

    // asUser: [async ({}, use) => {
    //   await use()
    // }, { scope: 'worker' }],

    authService: async ({request}, use) => {
      const auth = new AuthService(request);
      await use(auth);
      // await auth.loginAsAdmin();

    },

    apiService: async ({authService}, use) => {
      await use(authService);
    },

    postService: async ({request}, use) => {
      const postService = new PostService(request);
      await use(postService);
    },

    postsFactory: async ({request}, use) => {
      const factory = new PostsFactory(request);
      await use(factory);
      await factory.cleanup();
    }

});

export { expect } from '@playwright/test';