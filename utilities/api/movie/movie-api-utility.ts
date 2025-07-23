import { APIRequestContext, expect, APIResponse } from '@playwright/test';
import { FavouriteMovieRequest, FavouriteMovieResponse } from '../../../types/movie/favourite';
import { BaseAPIUtility } from '../base/base-api-utility';


export class MovieAPIUtility extends BaseAPIUtility {
    private movieAccountID: string;
    protected baseUrl: string;

    constructor(requestContext: APIRequestContext) {
        super(requestContext);
        this.baseUrl = process.env.API_BASE_URL || '';
        this.movieAccountID = process.env.MOVIE_ACCOUNT_ID || '';
    }

    protected getAuthHeaders(): Record<string, string> {
        return {
            'Authorization': `Bearer ${process.env.API_BEARER_TOKEN}`,
            'Content-Type': 'application/json'
        };
    }

    async getPopularMovies(language: string, page: string): Promise<APIResponse> {
        const response = await this.request.get(`${this.baseUrl}/movie/popular?language=${language}&page=${page}`,
            {
                headers: this.getAuthHeaders()
            });

        return response;
    }

    async addFavouriteMovie(favourite: FavouriteMovieRequest): Promise<APIResponse> {
        const response = await this.request.post(`${this.baseUrl}/account/${this.movieAccountID}/favorite`,
            {
                data: favourite,
                headers: this.getAuthHeaders()
            }
        );

        return response;
    }
}