export interface FavouriteMovieRequest {
    media_type: string;
    media_id: number;
    favorite: boolean;
}

export interface FavouriteMovieResponse {
    success: boolean;
    status_code: number;
    status_message: string;
}