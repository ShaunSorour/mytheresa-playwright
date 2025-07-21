import { expect, test } from '@playwright/test';
import { FavouriteMovieRequest, FavouriteMovieResponse } from '../../../types/movie/favourite';
import { Movie_APIHelper } from '../../../utilities/api/movie/movie-api-helper';
import { PopularMoviesResponse } from '../../../types/movie/movie';


let movieAPI: Movie_APIHelper;

test.beforeEach(async ({ request }) => {
    movieAPI = new Movie_APIHelper(request);
});

test('Get Popular Movies', async () => {
    const language = 'en-US';
    const page = '1';

    const response = await movieAPI.getPopularMovies(language, page);
    const popularMovies: PopularMoviesResponse = await response.json();

    expect(response.status()).toBe(200);
    expect(response.status()).toBeTruthy();
    expect(popularMovies).toHaveProperty('page');
    expect(popularMovies).toHaveProperty('results');
});

test('Add Fave Movie', async () => {
    const movie: FavouriteMovieRequest = {
        media_type: 'movie',
        media_id: 550,
        favorite: true,
    };

    const response = await movieAPI.addFavouriteMovie(movie);
    const faveMovie: FavouriteMovieResponse = await response.json();

    expect(response.status()).toBe(201);
    expect(response.status()).toBeTruthy();
    expect(faveMovie).toHaveProperty('success', true);
    expect(faveMovie).toHaveProperty('status_message', 'The item/record was updated successfully.');
    expect(faveMovie).toHaveProperty('status_code', 12);
});

test('Add Fave Movie - NEGATIVE', async () => {
    const movie: FavouriteMovieRequest = {
        media_type: 'INVALID',
        media_id: 550,
        favorite: true,
    };

    const response = await movieAPI.addFavouriteMovie(movie);
    const faveMovie: FavouriteMovieResponse = await response.json();

    console.log(faveMovie)
    expect(response.status()).toBe(201);
    expect(response.status()).toBeTruthy();
    expect(faveMovie).toHaveProperty('success', true);
    expect(faveMovie).toHaveProperty('status_message', 'The item/record was updated successfully.');
    expect(faveMovie).toHaveProperty('status_code', 12);
});
