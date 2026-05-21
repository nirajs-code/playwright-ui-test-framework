import { test, expect } from "@fixtures/base.fixture";

test('has title', async ({ homePage }) => {
  await homePage.navigate();
  await expect(homePage.currentPage).toHaveTitle(/Playwright/);
});

test('get started link', async ({ homePage, docsPage }) => {
  await homePage.navigate();
  await homePage.clickGetStartedLink();
  expect(await docsPage.isIntroductionHeadingVisible()).toBe(true);
});