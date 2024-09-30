import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base/base-page';


export class HomePage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async goto() {
        await this.page.goto(process.env.URL!);
        await expect(this.page).toHaveTitle("Home - FashionHub")
    }
}