import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/home.page';
import { DocsPage } from '@pages/docs.page';

type PageFixtures = {
  homePage: HomePage;
  docsPage: DocsPage;
};


export const test = base.extend<PageFixtures>({
  
    homePage: async ({ page }, use) => {
      const homePage = new HomePage(page);
      await use(homePage);
    },

    docsPage: async ({ page }, use) => {
      const docsPage = new DocsPage(page);
      await use(docsPage);
    }

});

export { expect } from '@playwright/test';