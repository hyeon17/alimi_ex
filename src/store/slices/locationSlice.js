import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  myLocation: { sidoName: '서울', stationName: '강남구' },
  allLocation: { sidoName: '서울' },
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setMyLocation: (state, action) => {
      state.myLocation.sidoName = action.payload.sidoName;
      state.myLocation.stationName = action.payload.stationName;
    },
    setAllLocation: (state, action) => {
      state.allLocation.sidoName = action.payload.sidoName;
    },
  },
});

export const { setMyLocation, setAllLocation } = locationSlice.actions;

export function useLocationSlice() {
  const allLocation = useSelector((state) => state.location.allLocation);
  const myLocation = useSelector((state) => state.location.myLocation);
  const dispatch = useDispatch();

  return {
    allLocation,
    myLocation,
    dispatch,
  };
}

export default locationSlice.reducer;
