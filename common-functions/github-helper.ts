import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';



async function fetchPullRequestPage(page: number, pageUrl: string) {
    const response = await axios.get(pageUrl, {
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

    const filePath = path.join(__dirname, 'pull_requests.csv');
    fs.writeFileSync(filePath, csvData);

    console.log(`Fetched ${pullRequests.length} pull requests`);
    console.log(`Pull request data saved to ${filePath}`);
}


async function fetchAllPullRequests(pageUrl: string) {
    let allPullRequests: any[] = [];
    let page = 1;
    let morePagesExist = true;

    while (morePagesExist) {
        const response = await fetchPullRequestPage(page, pageUrl);
        const parsedData = parsePullRequestData(response);

        allPullRequests = allPullRequests.concat(parsedData);

        const linkHeader = response.headers.link;
        morePagesExist = linkHeader && linkHeader.includes('rel="next"');
        page++;
    }

    writeDataToCSV(allPullRequests);
}

export { fetchAllPullRequests };
