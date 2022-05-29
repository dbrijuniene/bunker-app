import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacesState, PlaceUpdate } from '../types/index';

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
      (state: PlacesState, action: PayloadAction<PlaceUpdate>) => {
        const index = state.map((place) => place.id).indexOf(action.payload.id);
        state[index].name = action.payload.newName;
      },
    addPlace:
      (state: PlacesState, action: PayloadAction<string>) => {
        state.push({ id: state[state.length - 1].id + 1, name: action.payload });
      },
  },
});

export const { removePlace, updatePlace, addPlace } = placesSlice.actions;

export default placesSlice.reducer;
