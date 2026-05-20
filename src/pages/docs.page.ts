import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base.page";

class DocsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private get introductionHeading(): Locator {
        return this.page.getByRole('heading', { name: 'Installation' });
    }

    get pageUrl() : string {
        return 'https://playwright.dev/docs/intro';
    }

    get loadedIndicator() : Locator {
        return this.introductionHeading;
    }

    async isIntroductionHeadingVisible(): Promise<boolean> {
        return this.introductionHeading.isVisible();
    }
}

export { DocsPage };