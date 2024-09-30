import { expect, type Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv'
dotenv.config()

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}