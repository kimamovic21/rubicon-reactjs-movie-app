import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import moviesReducer from '../slices/moviesSlice';
import showsReducer from '../slices/showsSlice';
import movieDetailsReducer from '../slices/movieDetailsSlice';
import showDetailsReducer from '../slices/showDetailsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tvShows: showsReducer,
    movieDetails: movieDetailsReducer,
    showDetails: showDetailsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
