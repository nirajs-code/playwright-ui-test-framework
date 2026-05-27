import { Locator, Page } from "@playwright/test";

export abstract class BasePage {


    constructor(protected readonly page: Page) {}
    
    abstract get pageUrl(): string
    abstract get loadedIndicator(): Locator

    get currentPage(): Page {
        return this.page;
    }

    async navigate(): Promise<void> {
        await this.currentPage.goto(this.pageUrl);
        await this.waitforpageload();
    }

    async waitforpageload(): Promise<void> {
        await this.loadedIndicator.waitFor({ state: 'visible' });
    }
    
}