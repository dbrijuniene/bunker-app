import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types/index';

const initialState: RootState = {
  items: [
    {
      id: '1',
      name: 'Grikiai',
      units: 'g.',
      quantity: 500,
      validUntil: '2022-12-25',
    },
    {
      id: '2',
      name: 'Mėsos konservai (skardinės po 200 gr)',
      units: 'vnt.',
      quantity: 5,
      validUntil: '2022-12-18',
    },
    {
      id: '3',
      name: 'Ryžiai',
      units: 'g.',
      quantity: 400,
      validUntil: '2022-12-14',
    },
    {
      id: '4',
      name: 'Konservuotos pupelės',
      units: 'g.',
      quantity: 600,
      validUntil: '2022-11-25',
    },
    {
      id: '5',
      name: 'Šokoladas',
      units: 'g.',
      quantity: 200,
      validUntil: '2022-11-15',
    },
    {
      id: '6',
      name: 'Žuvies konservai',
      units: 'g.',
      quantity: 400,
      validUntil: '2022-12-28',
    },
  ],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    remove:
      (state: RootState, action: PayloadAction<number>) => {
        state.items.splice(action.payload, 1);
      },
  },
});

export const { remove } = itemsSlice.actions;

export default itemsSlice.reducer;
