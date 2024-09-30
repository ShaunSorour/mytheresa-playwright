import { Page, TestInfo, APIRequestContext, expect } from '@playwright/test';


export class CommonMethods {
    private page: Page;
    private testInfo: TestInfo;
    private logs: { message: string; type: string }[] = [];
    private errorMsg: { name: string; message: string }[] = [];

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async addScreenshot(name: string) {
        const screenshot = await this.page.screenshot();
        await this.testInfo.attach(name, {
            body: screenshot,
            contentType: 'image/png',
        });
    }

    async attachFileToTestReport(filename: string, filePath: string) {
        await this.testInfo.attach(filename, {
            path: filePath,
        });
    }

    async setupConsoleListener() {
        this.page.on('console', (msg) => {
            if (msg.type() === 'error') {
                this.logs.push({ message: msg.text(), type: msg.type() });
            }
        });
    }

    async setupPageErrorListener() {
        this.page.on('pageerror', (error) => {
            this.errorMsg.push({ name: error.name, message: error.message });
        });
    }

    async attachConsoleLogs() {
        const errorLogs = this.logs.map((e) => e.message).join('\n');
        if (this.logs.length > 0) {
            await this.testInfo.attach('console logs', {
                body: errorLogs,
                contentType: 'text/plain',
            });
        }
        expect.soft(this.logs.length).toBe(0);
        expect(this.errorMsg.length).toBe(0);
    }

    async checkPageLinks200(request: APIRequestContext) {
        const hrefs: string[] = await this.page.$$eval('a', (links: HTMLAnchorElement[]) =>
            links.map(link => link.href)
        );

        for (const href of hrefs) {
            const response = await request.get(href);
            expect(response.status(), `Link failed: ${href}`).toBe(200);
            console.log(`${href}: ${response.status() === 200 ? '200 OK' : 'Error'}`);
        }
    }
}