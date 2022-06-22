import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService, { formatError } from '../services/api-service';
import { PlacedItemsState, PlacedItem, NewPlacedItem } from '../types/index';

type RequestItems = {
  placeIds: string[],
  token: string
};
export const getItems = createAsyncThunk('items/getItems', async (request: RequestItems, thunkAPI) => {
  try {
    const response = await ApiService.post<PlacedItem[]>('/api/items/get', request.placeIds, {
      headers: {
        Authorization: request.token,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(formatError(error));
  }
});

export const addItem = createAsyncThunk('items/addItem', async (newItem: NewPlacedItem, thunkAPI) => {
  try {
    const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string);
    if (!token) {
      throw new Error('Please, re-login');
    }
    const response = await ApiService.post<PlacedItem>('/api/items/add', newItem, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(formatError(error));
  }
});

export const updateItem = createAsyncThunk('items/updateItem', async (item: PlacedItem, thunkAPI) => {
  try {
    const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string);
    if (!token) {
      throw new Error('Please, re-login');
    }
    const response = await ApiService.patch<PlacedItem>(
      `/api/items/update/${item.id}`,
      item,
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

export const removeItem = createAsyncThunk('items/removeItem', async (itemId: string, thunkAPI) => {
  try {
    const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string);
    if (!token) {
      throw new Error('Please, re-login');
    }
    const response = await ApiService.delete<PlacedItem[]>(
      `/api/items/delete/${itemId}`,
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

const initialState: PlacedItemsState = [];

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    removeItemsByPlaceId:
      (state: PlacedItemsState, action: PayloadAction<string>) => state.filter((s) => s.placeId !== action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, action) => action.payload);
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      const index = state.map((item) => item.id).indexOf(action.payload.id);
      state[index] = { ...action.payload };
    });
    builder.addCase(removeItem.fulfilled, (state, action) => action.payload);
  },
});

export const { removeItemsByPlaceId } = itemsSlice.actions;

export default itemsSlice.reducer;
