import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { dustApi } from './apis/dustApi';
import { favoriteSlice } from './slices/favoriteSlice';
import { locationSlice } from './slices/locationSlice';

const logger = createLogger();

const rootReducer = combineReducers({
  [dustApi.reducerPath]: dustApi.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger, dustApi.middleware]),
});

export default store;
