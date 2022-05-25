import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacesState } from '../types/index';

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
        const index = state.map((item) => item.id).indexOf(action.payload);
        state.splice(index, 1);
      },
  },
});

export const { removePlace } = placesSlice.actions;

export default placesSlice.reducer;
