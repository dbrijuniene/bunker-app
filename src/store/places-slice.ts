import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiService, { formatError } from '../services/api-service';
import { Place, PlacesState, PlaceUpdate } from '../types/index';
import { getItems } from './items-slice';

export const getPlaces = createAsyncThunk('places/getPlaces', async (token: string, thunkAPI) => {
  try {
    const response = await ApiService.get<Place[]>('/api/places', {
      headers: {
        Authorization: token,
      },
    });
    thunkAPI.dispatch(getItems({ placeIds: response.data.map((d) => d.id), token }));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(formatError(error));
  }
});

export const addPlace = createAsyncThunk('places/addPlace', async (newName: string, thunkAPI) => {
  try {
    const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string);
    if (!token) {
      throw new Error('Please, re-login');
    }
    const response = await ApiService.post<Place>('/api/places/add', { name: newName }, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(formatError(error));
  }
});

export const updatePlace = createAsyncThunk('places/updatePlace', async (placeUpdate: PlaceUpdate, thunkAPI) => {
  try {
    const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string);
    if (!token) {
      throw new Error('Please, re-login');
    }
    const response = await ApiService.patch<Place>(
      `/api/places/update/${placeUpdate.id}`,
      { name: placeUpdate.newName },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(formatError(error));
  }
});

export const removePlace = createAsyncThunk('places/removePlace', async (placeId: string, thunkAPI) => {
  try {
    const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string);
    if (!token) {
      throw new Error('Please, re-login');
    }
    const response = await ApiService.delete<Place[]>(
      `/api/places/delete/${placeId}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(formatError(error));
  }
});

const initialState: PlacesState = [];

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlaces.fulfilled, (state, action) => action.payload);
    builder.addCase(addPlace.fulfilled, (state, action) => {
      state.push({ ...action.payload });
    });
    builder.addCase(updatePlace.fulfilled, (state, action) => {
      const index = state.map((place) => place.id).indexOf(action.payload.id);
      state[index].name = action.payload.name;
    });
    builder.addCase(removePlace.fulfilled, (state, action) => action.payload);
  },
});

export default placesSlice.reducer;
