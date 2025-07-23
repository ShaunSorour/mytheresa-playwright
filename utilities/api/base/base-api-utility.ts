import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


export class BaseAPIUtility {
    protected request: APIRequestContext;

    constructor(requestContext: APIRequestContext) {
        this.request = requestContext;
    }

    async validateResponse<T>(response: APIResponse, expectedStatus: number): Promise<T> {
        const actualStatus = response.status();
        if (actualStatus !== expectedStatus) {
            const body = await response.text();
            console.error(`ERROR - Response body:`, body);
        }
        expect(actualStatus).toBe(expectedStatus);
        return response.json() as Promise<T>;
    }
}