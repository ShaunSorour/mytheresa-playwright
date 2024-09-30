import { test, expect, Page, TestInfo } from '@playwright/test';

const logs: { message: string; type: string }[] = [];
const errorMsg: { name: string; message: string }[] = [];


function setupConsoleListener(page: Page): void {
    page.on('console', (msg) => {
        if (msg.type() === 'error') {
            logs.push({ message: msg.text(), type: msg.type() });
        }
    });
}

function setupPageErrorListener(page: Page): void {
    page.on('pageerror', (error) => {
        errorMsg.push({ name: error.name, message: error.message });
    });
}

async function navigateToPage(page: Page, url: string): Promise<void> {
    await page.goto(url);
}

async function attachConsoleLogs(testInfo: TestInfo): Promise<void> {
    const errorLogs = logs.map(e => e.message).join('\n');
    if (logs.length > 0) {
        await testInfo.attach('console logs', {
            body: errorLogs,
            contentType: 'text/plain',
        });
    }
}

test('Check the exception and logs in console log', async ({ page }, testInfo) => {
    setupConsoleListener(page);
    setupPageErrorListener(page);

    await navigateToPage(page, 'http://localhost:4000/fashionhub/about.html');

    await attachConsoleLogs(testInfo);

    expect.soft(logs.length).toBe(0);
    expect(errorMsg.length).toBe(0);
});
