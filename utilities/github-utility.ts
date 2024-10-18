import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';


async function fetchPullRequestPage(page: number, githubProject: string, githubOrg: string): Promise<AxiosResponse<PullRequest[]>> {
    const url = `${process.env.GITHUB_API_URL}/${githubOrg}/${githubProject}/pulls`;

    const response = await axios.get<PullRequest[]>(url, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
        },
        params: {
            page,
            per_page: 100,
        },
    });

    return response; 
}

function parsePullRequestData(response: PullRequest[]): PullRequestDTO[] {
    return response.map((pr) => ({
        name: pr.title,
        createdAt: pr.created_at,
        author: pr.user.login,
    }));
}

function writeDataToCSV(pullRequests: PullRequestDTO[]) {
    const csvData = 'PR Name,Created Date,Author\n' + pullRequests
        .map((pr) => `${pr.name},${pr.createdAt},${pr.author}`)
        .join('\n');

    const filePath = 'tests/pull_requests.csv';
    fs.writeFileSync(filePath, csvData);

    console.log(`Pull request data saved to ${filePath}`);
}

async function fetchAllPullRequests(githubProject: string, githubOrg: string) {
    let allPullRequests: PullRequestDTO[] = [];
    let page = 1;
    let morePagesExist = true;

    while (morePagesExist) {
        const response = await fetchPullRequestPage(page, githubProject, githubOrg);
        const parsedData = parsePullRequestData(response.data); 

        allPullRequests = allPullRequests.concat(parsedData);

        const linkHeader = response.headers.link; 
        morePagesExist = linkHeader && linkHeader.includes('rel="next"');
        page++;
    }

    writeDataToCSV(allPullRequests);
}

export { fetchAllPullRequests };