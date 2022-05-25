import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemsState } from '../types/index';

const initialState: ItemsState = [
  {
    id: '1',
    name: 'Buckwheat',
    units: 'g',
    quantity: 500,
    status: '',
    validUntil: '2022-12-25',
  },
  {
    id: '2',
    name: 'Canned meat',
    units: 'pieces',
    quantity: 5,
    status: '',
    validUntil: '2022-12-18',
  },
  {
    id: '3',
    name: 'Water',
    units: 'l',
    quantity: 5,
    status: '',
    validUntil: '2022-12-14',
  },
];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    removeItem:
      (state: ItemsState, action: PayloadAction<number>) => {
        const index = state.map((item) => item.id).indexOf(action.payload);
        state.splice(index, 1);
      },
  },
});

export const { removeItem } = itemsSlice.actions;

export default itemsSlice.reducer;
