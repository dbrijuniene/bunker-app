import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacedItemsState } from '../types/index';
import Status from '../types/status-enum';

const initialState: PlacedItemsState = [
  {
    id: 1,
    placeId: 2,
    name: 'Buckwheat',
    units: 'g',
    quantity: 500,
    status: Status.Packed,
    validUntil: '2022-12-25',
  },
  {
    id: 2,
    placeId: 2,
    name: 'Canned meat',
    units: 'pieces',
    quantity: 5,
    status: Status.Wish,
    validUntil: '2022-12-18',
  },
  {
    id: 3,
    placeId: 1,
    name: 'Water',
    units: 'l',
    quantity: 5,
    status: Status.Expired,
    validUntil: '2022-04-14',
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
  },
});

export const { removeItem } = itemsSlice.actions;

export default itemsSlice.reducer;
