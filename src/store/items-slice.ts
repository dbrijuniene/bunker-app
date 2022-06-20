import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { formatISO } from 'date-fns';
import { PlacedItemsState, PlacedItem, NewPlacedItem } from '../types/index';

export const getItems = createAsyncThunk('items/getItems', async (placeIds: string[]) => {
  const response = await axios.get<PlacedItem[]>(
    `http://localhost:8000/items?placeId=${placeIds.join('&placeId=')}`,
  );
  return response.data;
});

const initialState: PlacedItemsState = [];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    removeItem:
      (state: PlacedItemsState, action: PayloadAction<string>) => {
        const index = state.map((item) => item.id).indexOf(action.payload);
        state.splice(index, 1);
      },
    removeItemsByPlaceId:
      (state: PlacedItemsState, action: PayloadAction<string>) => state.filter((s) => s.placeId !== action.payload),
    addItem:
      (state: PlacedItemsState, action: PayloadAction<NewPlacedItem>) => {
        state.push({
          id: `${state[state.length - 1].id}+1`,
          ...action.payload,
          validUntil: formatISO(action.payload.validUntil),
        });
      },
    editItem:
      (state: PlacedItemsState, action: PayloadAction<PlacedItem>) => {
        const index = state.map((item) => item.id).indexOf(action.payload.id);
        state[index] = { ...action.payload };
      },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, action) => action.payload);
  },
});

export const {
  removeItem, addItem, editItem, removeItemsByPlaceId,
} = itemsSlice.actions;

export default itemsSlice.reducer;
