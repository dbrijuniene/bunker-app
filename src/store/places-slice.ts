import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  NewPlace, Place, PlacesState, PlaceUpdate,
} from '../types/index';
import { getItems } from './items-slice';

export const getPlaces = createAsyncThunk('places/getPlaces', async (userId: number, ThunkAPI) => {
  const response = await axios.get<Place[]>(
    `http://localhost:8000/places?userId=${userId}`,
  );
  ThunkAPI.dispatch(getItems(response.data.map((d) => d.id)));
  return response.data;
});

const initialState: PlacesState = [];

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    removePlace: (state: PlacesState, action: PayloadAction<number>) => {
      const index = state.map((place) => place.id).indexOf(action.payload);
      state.splice(index, 1);
    },
    updatePlace: (state: PlacesState, action: PayloadAction<PlaceUpdate>) => {
      const index = state.map((place) => place.id).indexOf(action.payload.id);
      state[index].name = action.payload.newName;
    },
    addPlace: (state: PlacesState, action: PayloadAction<NewPlace>) => {
      state.push({ id: state[state.length - 1].id + 1, ...action.payload });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlaces.fulfilled, (state, action) => action.payload);
  },
});

export const { removePlace, updatePlace, addPlace } = placesSlice.actions;

export default placesSlice.reducer;
