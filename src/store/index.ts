import {
  AnyAction, combineReducers, configureStore, Reducer,
} from '@reduxjs/toolkit';
import itemsReducer from './items-slice';
import sharedReducer from './shared-slice';
import placesReducer from './places-slice';

const combinedReducer = combineReducers({
  shared: sharedReducer, items: itemsReducer, places: placesReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'shared/logout') {
    // eslint-disable-next-line no-param-reassign
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
