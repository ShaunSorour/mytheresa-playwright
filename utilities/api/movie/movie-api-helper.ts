import { PopularMoviesResponse } from './../../../types/movie/movie';
import { APIRequestContext, expect } from '@playwright/test';
import { FavouriteMovieRequest, FavouriteMovieResponse } from '../../../types/movie/favourite';
import { BaseAPIHelper } from './base-api-helper';


export class Movie_APIHelper extends BaseAPIHelper {
    private movieAccountID: string;

    constructor(requestContext: APIRequestContext) {
        super(requestContext);
        this.movieAccountID = process.env.MOVIE_ACCOUNT_ID || '';
    }

    async getPopularMovies(language: string, page: string): Promise<PopularMoviesResponse> {
        const response = await this.request.get(`${this.baseUrl}/movie/popular?language=${language}&page=${page}`);
        expect(response.status()).toBe(200);
        const movies: PopularMoviesResponse = await response.json();
        return movies;
    }

    async addFavouriteMovie(favourite: FavouriteMovieRequest): Promise<FavouriteMovieResponse> {
        const response = await this.request.post(
            `${this.baseUrl}/account/${this.movieAccountID}/favorite`,
            {
                data: favourite,
                headers: this.getAuthHeaders()
            }
        );
        expect(response.status()).toBe(201);
        const faveMovie: FavouriteMovieResponse = await response.json();
        return faveMovie;
    }
}