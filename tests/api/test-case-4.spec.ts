import * as fs from 'fs';
import * as path from 'path';
import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base/base-page';
import { fetchAllPullRequests } from '../../utilities/api/github-demo/github-utility';


let base: BasePage;

test.beforeEach(async ({ page }, testInfo) => {
  base = new BasePage(page, testInfo);
});

test('Fetch GitHub Pull Requests for product and Save to CSV', async ({ page }) => {
  const githubProject = 'appwrite';
  const githubOrg = 'appwrite';

  await fetchAllPullRequests(githubProject, githubOrg);

  // check file was created
  const filePath = path.join(__dirname, 'pull_requests.csv');
  expect(fs.existsSync(filePath)).toBe(true);

  await base.attachFileToTestReport("PRs-Open", "tests/pull_requests.csv")
  await page.close();
});
