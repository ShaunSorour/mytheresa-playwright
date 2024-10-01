import axios from 'axios';
import * as fs from 'fs';


async function fetchPullRequestPage(page: number, githubProject: string, githubOrg: string) {
    const url = `${process.env.GITHUB_API_URL}/${githubOrg}/${githubProject}/pulls`

    const response = await axios.get(url, {
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

function parsePullRequestData(response: any) {
    return response.data.map((pr: any) => ({
        name: pr.title,
        created_at: pr.created_at,
        author: pr.user.login,
    }));
}

function writeDataToCSV(pullRequests: any[]) {
    const csvData = 'PR Name,Created Date,Author\n' + pullRequests
        .map((pr: any) => `${pr.name},${pr.created_at},${pr.author}`)
        .join('\n');

    const filePath = 'tests/pull_requests.csv';
    fs.writeFileSync(filePath, csvData);

    console.log(`Pull request data saved to ${filePath}`);
}

async function fetchAllPullRequests(githubProject: string, githubOrg: string) {
    let allPullRequests: any[] = [];
    let page = 1;
    let morePagesExist = true;

    while (morePagesExist) {
        const response = await fetchPullRequestPage(page, githubProject, githubOrg);
        const parsedData = parsePullRequestData(response);

        allPullRequests = allPullRequests.concat(parsedData);

        const linkHeader = response.headers.link;
        morePagesExist = linkHeader && linkHeader.includes('rel="next"');
        page++;
    }

    writeDataToCSV(allPullRequests);
}

export { fetchAllPullRequests };