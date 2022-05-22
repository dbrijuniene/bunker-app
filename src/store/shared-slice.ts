/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SharedState } from '../types/index';

const initialState: SharedState = {
  loading: false,
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setLoading:
      (state: SharedState, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
  },
});

export const { setLoading } = sharedSlice.actions;

export default sharedSlice.reducer;
