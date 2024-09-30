import { test } from '@playwright/test';
import { CommonMethods } from '../common-functions/common';
import { HomePage } from '../pageObjects/home/home-page';


let common: CommonMethods;
let home: HomePage;

test.beforeEach(async ({ page }, testInfo) => {
    common = new CommonMethods(page, testInfo);
    home = new HomePage(page);

});

test('Console error check - Home page', async () => {
    await common.setupConsoleListener();
    await common.setupPageErrorListener();
    await home.goto();
    await common.attachConsoleLogs();
});
