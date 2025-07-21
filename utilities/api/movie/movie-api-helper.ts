import { APIRequestContext, expect, APIResponse } from '@playwright/test';
import { FavouriteMovieRequest, FavouriteMovieResponse } from '../../../types/movie/favourite';
import { BaseAPIHelper } from './base-api-helper';


export class Movie_APIHelper extends BaseAPIHelper {
    private movieAccountID: string;

    constructor(requestContext: APIRequestContext) {
        super(requestContext);
        this.movieAccountID = process.env.MOVIE_ACCOUNT_ID || '';
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