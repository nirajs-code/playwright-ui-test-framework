import { expect, Locator, Page } from "@playwright/test";
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

    private get settingUpCILinkInSideBar(): Locator {
        return this.page.getByRole("navigation", {name: 'Docs sidebar'})
            .filter({has: this.page.getByRole("link", {name: 'Setting up CI'})})
            .getByRole("link", {name: 'Setting up CI'})
    }

    private get settingUpCiHeading(): Locator {
        return this.page.getByRole("heading", {name: "Setting up CI"})
    }

    async clickGetStartedLink(): Promise<void> {
        await this.getStartedLink.click();
    }

    async clickOnCILinkInSideBar(): Promise<void> {
        await this.settingUpCILinkInSideBar.click();
    }

    async settingUpCiHeadingVisible(): Promise<void> {
        await expect.soft(this.settingUpCiHeading).toBeVisible();
    }

} 

export { HomePage };

// export const homePage = (page: Page) => new HomePage(page);