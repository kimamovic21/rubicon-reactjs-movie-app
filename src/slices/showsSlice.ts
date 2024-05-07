import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../redux/store';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY; 
const API_TOKEN = import.meta.env.VITE_API_TOKEN; 

interface TVShow {
  id: number;
  name: string;
}

interface TVShowsState {
  tvShows: TVShow[];
  loading: boolean;
  error: string | null;
}

const initialState: TVShowsState = {
  tvShows: [],
  loading: false,
  error: null,
};

const showsSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {
    fetchTVShowsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTVShowsSuccess(state, action: PayloadAction<TVShow[]>) {
      state.tvShows = action.payload;
      state.loading = false;
    },
    fetchTVShowsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchTVShowsStart, fetchTVShowsSuccess, fetchTVShowsFailure } = showsSlice.actions;


export const fetchTVShows = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchTVShowsStart());
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/tv/top_rated',
      params: {
        api_key: API_KEY,
      },
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      }
    };
    const response = await axios.request(options);
    dispatch(fetchTVShowsSuccess(response.data.results)); 
  } catch (error) {
    console.error(error);
    dispatch(fetchTVShowsFailure(error.message));
  }
};

export const searchTVShows = (query: string): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchTVShowsStart());
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/tv',
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
    dispatch(fetchTVShowsSuccess(response.data.results)); 
  } catch (error) {
    console.error(error);
    dispatch(fetchTVShowsFailure(error.message));
  }
};

export default showsSlice.reducer;
