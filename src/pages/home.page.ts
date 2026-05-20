import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base.page";

class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    get pageUrl() : string {
        return '/';
    }
    
    get loadedIndicator() : Locator {
        return this.getStartedLink;
    }

    private get getStartedLink() : Locator {
        return this.page.getByRole('link', { name: 'Get started' });
    }

    async clickGetStartedLink(): Promise<void> {
        await this.getStartedLink.click();
    }

} 

export { HomePage };

// export const homePage = (page: Page) => new HomePage(page);