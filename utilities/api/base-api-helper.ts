import { APIRequestContext } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


export class BaseAPIHelper {
    protected request: APIRequestContext;
    protected baseUrl: string;

    constructor(requestContext: APIRequestContext) {
        this.request = requestContext;
        this.baseUrl = process.env.API_BASE_URL || '';
    }

    protected getAuthHeaders(): Record<string, string> {
        return {
            'Authorization': `Bearer ${process.env.API_BEARER_TOKEN}`,
            'Content-Type': 'application/json'
        };
    }
}