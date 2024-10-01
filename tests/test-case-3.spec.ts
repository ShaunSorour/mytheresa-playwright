import { LoginPage } from '../pageObjects/login/login-page';
import { test } from '@playwright/test';
import { CommonMethods } from '../common-functions/common';


let common: CommonMethods;
let login: LoginPage;

test.beforeEach(async ({ page }, testInfo) => {
  common = new CommonMethods(page, testInfo)
  login = new LoginPage(page);
});

test('Successful Login', async ({ page }) => {
  await login.goto();
  await common.addScreenshot("Login page");
  await login.fillCredentials(process.env.USERNAME!, process.env.PASSWORD!);
  await login.loginPositive();
  await common.addScreenshot("Signed in Successfully");
  await page.close();
});
