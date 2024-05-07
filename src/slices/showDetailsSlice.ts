import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY; 

interface ShowDetails {
  id: number;
  name: string;
  overview: string;
  original_language: string;
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  videos: { results: { key: string }[] };
}

interface ShowDetailsState {
  show: ShowDetails | null;
  videos: ShowVideos | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShowDetailsState = {
  show: null,
  videos: null,
  loading: false,
  error: null,
};

export const fetchShowDetails = createAsyncThunk(
  'showDetails/fetchShowDetails',
  async (showId: string, { rejectWithValue }) => {
    try {
      const [showResponse, videosResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${API_KEY}`)
      ]);

      const showData = showResponse.data;
      const videosData = videosResponse.data;

      // Merge show data and videos data
      const mergedData: ShowDetails = {
        ...showData,
        videos: videosData,
      };

      return mergedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const showDetailsSlice = createSlice({
  name: 'showDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.show = action.payload;
        state.videos = action.payload;
        state.error = null;
      })
      .addCase(fetchShowDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.show = null;
        state.videos = null;
      });
  },
});

export default showDetailsSlice.reducer;
