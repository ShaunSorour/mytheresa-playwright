import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { test, expect } from '@playwright/test';



const GITHUB_API_URL = 'https://api.github.com/repos/appwrite/appwrite/pulls';
const PER_PAGE = 100;

async function fetchPullRequestPage(page: number) {
  const response = await axios.get(GITHUB_API_URL, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    params: {
      page,
      per_page: PER_PAGE,
    },
  });
  return response;
}

async function fetchAllPullRequests() {
  let allPullRequests: any[] = [];
  let page = 1;
  let morePagesExist = true;

  while (morePagesExist) {
    const response = await fetchPullRequestPage(page);

    allPullRequests = allPullRequests.concat(
      response.data.map((pr: any) => ({
        name: pr.title,
        created_at: pr.created_at,
        author: pr.user.login,
      }))
    );

    const linkHeader = response.headers.link;
    morePagesExist = linkHeader && linkHeader.includes('rel="next"');
    page++;
  }

  const csvData = 'PR Name,Created Date,Author\n' + allPullRequests
    .map((pr: any) => `${pr.name},${pr.created_at},${pr.author}`)
    .join('\n');

  const filePath = path.join(__dirname, 'pull_requests.csv');
  fs.writeFileSync(filePath, csvData);

  console.log(`Fetched ${allPullRequests.length} pull requests`);
  console.log(`Pull request data saved to ${filePath}`);
}

test('Fetch GitHub Pull Requests and Save to CSV', async ({ page }) => {
  await fetchAllPullRequests();

  const filePath = path.join(__dirname, 'pull_requests.csv');
  expect(fs.existsSync(filePath)).toBe(true);
});
