import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacedItemsState, PlacedItem, NewPlacedItem } from '../types/index';
import Status from '../types/status-enum';

const initialState: PlacedItemsState = [
  {
    id: 1,
    placeId: 2,
    name: 'Buckwheat',
    units: 'g',
    quantity: 500,
    status: Status.Packed,
    validUntil: new Date(2022, 12, 25),
  },
  {
    id: 2,
    placeId: 2,
    name: 'Canned meat',
    units: 'pieces',
    quantity: 5,
    status: Status.Wish,
    validUntil: new Date(2022, 12, 18),
  },
  {
    id: 3,
    placeId: 1,
    name: 'Water',
    units: 'l',
    quantity: 5,
    status: Status.Wish,
    validUntil: new Date(2022, 4, 14),
  },
];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    removeItem:
      (state: PlacedItemsState, action: PayloadAction<number>) => {
        const index = state.map((item) => item.id).indexOf(action.payload);
        state.splice(index, 1);
      },
    removeItemsByPlaceId:
      (state: PlacedItemsState, action: PayloadAction<number>) => state.filter((s) => s.placeId !== action.payload),
    addItem:
      (state: PlacedItemsState, action: PayloadAction<NewPlacedItem>) => {
        state.push({ id: state[state.length - 1].id + 1, ...action.payload });
      },
    editItem:
      (state: PlacedItemsState, action: PayloadAction<PlacedItem>) => {
        const index = state.map((item) => item.id).indexOf(action.payload.id);
        state[index] = { ...action.payload };
      },
  },
});

export const {
  removeItem, addItem, editItem, removeItemsByPlaceId,
} = itemsSlice.actions;

export default itemsSlice.reducer;
