import { LoginPage } from '../../../pages/login/login-page';
import { test } from '@playwright/test';
import { BasePage } from '../../../pages/base/base-page';


let base: BasePage;
let login: LoginPage;

test.beforeEach(async ({ page }, testInfo) => {
  base = new BasePage(page, testInfo);
  login = new LoginPage(page, testInfo);
});

test('Successful Login', async ({ page }) => {
  await login.goto();
  await base.addScreenshot("Login page");
  await login.fillCredentials(process.env.USERNAME!, process.env.PASSWORD!);
  await login.loginPositive();
  await base.addScreenshot("Signed in Successfully");
  await page.close();
});
