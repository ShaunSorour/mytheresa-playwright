import { expect, test } from '@playwright/test';
import { FavouriteMovieRequest, FavouriteMovieResponse } from '../../../types/movie/favourite';
import { Movie_APIHelper } from '../../../utilities/api/movie/movie-api-helper';


let movieAPI: Movie_APIHelper;

test.beforeEach(async ({ request }) => {
    movieAPI = new Movie_APIHelper(request);
});

test('Add fave movie', async () => {

    const movie: FavouriteMovieRequest = {
        media_type: 'movie',
        media_id: 550,
        favorite: true,
    };

    const faveMovie: FavouriteMovieResponse = await movieAPI.addFavouriteMovie(movie);

    expect(faveMovie).toHaveProperty('success', true);
    expect(faveMovie).toHaveProperty('status_message', 'The item/record was updated successfully.');
    expect(faveMovie).toHaveProperty('status_code', 12);
});

