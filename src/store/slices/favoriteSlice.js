import { createSlice } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  locations: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteItem: (state, action) => {
      state.locations = [...state.locations, action.payload];
    },
    deleteFavoriteItem: (state, action) => {
      state.locations = state.locations.filter(
        (element) => !(element.stationName === action.payload.stationName && element.sidoName === action.payload.sidoName),
      );
    },
  },
});

export const { addFavoriteItem, deleteFavoriteItem } = favoriteSlice.actions;

export function useFavoriteSlice() {
  const favorite = useSelector((state) => state.favorite.locations);
  const dispatch = useDispatch();
  const favoriteLocations = useMemo(
    () =>
      favorite.reduce(
        (acc, { sidoName, stationName }) =>
          acc[sidoName] ? { ...acc, [sidoName]: [...acc[sidoName], stationName] } : { ...acc, [sidoName]: [stationName] },
        {},
      ),
    [favorite],
  );
  const favoriteSidos = useMemo(() => Object.keys(favoriteLocations), [favoriteLocations]);

  return {
    favorite,
    dispatch,
    favoriteLocations,
    favoriteSidos,
  };
}

export default favoriteSlice.reducer;
