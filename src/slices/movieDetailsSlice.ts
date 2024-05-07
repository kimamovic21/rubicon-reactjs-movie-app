import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY; 

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  original_language: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  video: { results: { key: string }[] };
}

interface MovieDetailsState {
  movie: MovieDetails | null;
  videos: MovieVideos | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailsState = {
  movie: null,
  videos: null,
  loading: false,
  error: null,
};

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieId: string, { rejectWithValue }) => {
    try {
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
      const videosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);

      const movieData = movieResponse.data;
      const videosData = videosResponse.data;

      const mergedData: MovieDetails = {
        ...movieData,
        video: videosData,
      };

      return mergedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
        state.videos = action.payload.video; 
        state.error = null;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.movie = null;
        state.videos = null;
      });
  },
});

export default movieDetailsSlice.reducer;
