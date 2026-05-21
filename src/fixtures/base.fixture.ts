import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/home.page';
import { DocsPage } from '@pages/docs.page';

type PageFixtures = {
  homePage: HomePage;
  docsPage: DocsPage;
};

type AuthFixtures = {
  asGuest: void;
  asUser: void;
};


export const test = base.extend<PageFixtures & AuthFixtures>({
  
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

});

export { expect } from '@playwright/test';