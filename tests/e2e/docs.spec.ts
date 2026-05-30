import { test, expect } from "@fixtures/base.fixture";

test('verify documentation page title @docs', async ({docsPage}) => {
    await docsPage.navigate();
    await docsPage.waitforpageload();
    expect(await docsPage.isIntroductionHeadingVisible()).toBe(true);
    expect(await docsPage.isDocSidebarVisible()).toBe(true);
    await docsPage.verifyPageHasAllComponents();
});