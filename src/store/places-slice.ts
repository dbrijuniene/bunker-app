/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place, PlacesState } from '../types/index';

const initialState: PlacesState = [
  {
    id: 1,
    name: 'Backpack',
  },
  {
    id: 2,
    name: 'Home storage',
  },
];

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    removePlace:
      (state: PlacesState, action: PayloadAction<number>) => {
        const index = state.map((place) => place.id).indexOf(action.payload);
        state.splice(index, 1);
      },
    updatePlace:
      (state: PlacesState, action: PayloadAction<any>) => {
        const index = state.map((place) => place.id).indexOf(action.payload.id);
        state[index].name = action.payload.newName;
      },
  },
});

export const { removePlace, updatePlace } = placesSlice.actions;

export default placesSlice.reducer;
