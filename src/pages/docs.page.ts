import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base.page";

class DocsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get pageUrl() : string {
        return 'https://playwright.dev/docs/intro';
    }

    get loadedIndicator() : Locator {
        return this.introductionHeading;
    }

    private get introductionHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Installation' });
    }

    private get docSidebar(): Locator {
        return this.page.getByRole('navigation', { name: 'Docs sidebar' });
    }

    private get introductionSubHeading(): Locator {
        return this.page.getByRole('heading', {name: 'Direct link to Introduction'});
    }

    private get tableOfContent(): Locator {
        return this.page.getByText('IntroductionInstalling');
    }

    private get gettingStartedLink(): Locator {
        return this.page.getByRole('button', {name: 'Getting Started'});
    }

    private get writingTestsLink(): Locator {
        return this.page.getByRole('link', { name: 'Writing tests', exact: true });
    }

    private get tipsFirstList(): Locator {
        return this.page.getByText('See the browser window: add ');
    }

    private get htmlTestReportHeading(): Locator {
        return this.page.getByRole("heading", {name: 'HTML Test Reports'})
    }

    async isIntroductionHeadingVisible(): Promise<boolean> {
        return this.introductionHeading.isVisible();
    }

    async isDocSidebarVisible(): Promise<boolean> {
        return this.docSidebar.isVisible();
    }

    async verifyPageHasAllComponents(): Promise<void> {
        await expect.soft(this.introductionSubHeading).toBeVisible();
        await expect.soft(this.gettingStartedLink).toBeVisible();
        await expect.soft(this.writingTestsLink).toBeVisible();
        await expect.soft(this.tipsFirstList).toBeVisible();
        await expect.soft(this.tableOfContent).toBeVisible();
        await expect.soft(this.htmlTestReportHeading).toBeVisible();
    }
}

export { DocsPage };