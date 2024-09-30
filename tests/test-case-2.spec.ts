import { test, expect } from '@playwright/test';
import { CommonMethods } from '../common-functions/common';
import { HomePage } from '../pageObjects/home/home-page';


let common: CommonMethods;
let home: HomePage;


test.beforeEach(async ({ page }, testInfo) => {
  common = new CommonMethods(page, testInfo);
  home = new HomePage(page);

});

test('200 status link check - Home page', async ({ request }) => {
  await home.goto();
  await common.checkPageLinks200(request)
});