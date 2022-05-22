import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items-slice';
import sharedReducer from './shared-slice';

const store = configureStore({
  reducer: { shared: sharedReducer, items: itemsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
