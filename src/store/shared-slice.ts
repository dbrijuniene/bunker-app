/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SharedState } from '../types/index';

const initialState: SharedState = {
  loading: false,
  serverErrorMsg: undefined,
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setLoading:
      (state: SharedState, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
    setServerErrorMsg:
      (state: SharedState, action: PayloadAction<string>) => {
        state.serverErrorMsg = action.payload;
      },
    resetServerErrorMsg:
      (state: SharedState) => {
        state.serverErrorMsg = undefined;
      },
  },
});

export const { setLoading, setServerErrorMsg, resetServerErrorMsg } = sharedSlice.actions;

export default sharedSlice.reducer;
