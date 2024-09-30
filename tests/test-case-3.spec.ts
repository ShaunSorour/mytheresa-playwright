import { LoginPage } from '../pageObjects/login/login-page';
import { test } from '@playwright/test';
import { commonMethods } from '../common-functions/common';


let common: commonMethods;
let login: LoginPage;

test.beforeEach(async ({ page }, testInfo) => {
  common = new commonMethods(page, testInfo)
  login = new LoginPage(page);
});

test('Successful Login', async ({ page }) => {
  await login.goto();
  await login.fillCredentials(process.env.USERNAME!, process.env.PASSWORD!);
  await login.loginPositive();
  await common.addScreenshot("Signed in Successfully");
  await page.close();
});
