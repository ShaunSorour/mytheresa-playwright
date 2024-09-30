export class commonMethods {
    private page: any
    private testInfo: any

    constructor(page: any, testInfo: any) {
        this.page = page
        this.testInfo = testInfo;
    }

    async addScreenshot(name: string){
        const screenshot = await this.page.screenshot();

        await this.testInfo.attach(name, {
            body: screenshot,
            contentType: "image/png"
        });
    }
}

