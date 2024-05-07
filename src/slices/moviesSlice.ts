import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../redux/store';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY; 
const API_TOKEN = import.meta.env.VITE_API_TOKEN; 

interface Movie {
  id: number;
  title: string;
}

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
      state.loading = false;
    },
    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } = moviesSlice.actions;

export const fetchMovies = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchMoviesStart());
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      params: {
        api_key: API_KEY,
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    };
    
    const response = await axios.request(options);
    dispatch(fetchMoviesSuccess(response.data.results)); 
  } catch (error) {
    console.error(error);
    dispatch(fetchMoviesFailure(error.message));
  }
};

export const searchMovies = (query: string): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchMoviesStart());
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        api_key: API_KEY,
        query: query,
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    };
    const response = await axios.request(options);
    dispatch(fetchMoviesSuccess(response.data.results)); 
  } catch (error) {
    console.error(error);
    dispatch(fetchMoviesFailure(error.message));
  }
};

export default moviesSlice.reducer;
