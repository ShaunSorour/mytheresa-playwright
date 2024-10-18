import { test } from '@playwright/test';
import { HomePage } from '../../pages/home/home-page';
import { BasePage } from '../../pages/base/base-page';


let base: BasePage;
let home: HomePage;

test.beforeEach(async ({ page }, testInfo) => {
    base = new BasePage(page, testInfo);
    home = new HomePage(page, testInfo);
});

test('Console error check - Home page', async ({ page }) => {
    await base.setupConsoleListener();
    await base.setupPageErrorListener();
    await home.goto();
    await base.attachConsoleLogs();
    await page.close();
});
