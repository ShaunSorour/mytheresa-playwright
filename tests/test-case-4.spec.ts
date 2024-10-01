import * as fs from 'fs';
import * as path from 'path';
import { test, expect } from '@playwright/test';
import { fetchAllPullRequests } from '../common-functions/github-helper';
import { CommonMethods } from '../common-functions/common';


let common: CommonMethods;

test.beforeEach(async ({ page }, testInfo) => {
  common = new CommonMethods(page, testInfo)
});

test('Fetch GitHub Pull Requests for product and Save to CSV', async ({ page }) => {
  const githubProject = 'appwrite';
  const githubOrg = 'appwrite';

  await fetchAllPullRequests(githubProject, githubOrg);

  // check file was created
  const filePath = path.join(__dirname, 'pull_requests.csv');
  expect(fs.existsSync(filePath)).toBe(true);

  await common.attachFileToTestReport("PRs-Open", "tests/pull_requests.csv")
  await page.close();
});
