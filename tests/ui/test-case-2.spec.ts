import { test } from '@playwright/test';
import { HomePage } from '../../pages/home/home-page';
import { BasePage } from '../../pages/base/base-page';


let base: BasePage;
let home: HomePage;

test.beforeEach(async ({ page }, testInfo) => {
  base = new BasePage(page, testInfo);
  home = new HomePage(page, testInfo);
});

test('200 status link check - Home page', async ({ request, page }) => {
  await home.goto();
  await base.checkPageLinks200(request);
  await page.close();
});