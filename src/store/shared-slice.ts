import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  Crudentials, LoggedUser, SharedState, TemporaryUser, UserRegistration,
} from '../types/index';
import { getPlaces } from './places-slice';

export const login = createAsyncThunk('shared/login', async (crudentials: Crudentials, thunkAPI) => {
  const response = await axios.get<TemporaryUser[]>(
    `http://localhost:8000/users?email=${crudentials.email}&password=${crudentials.password}`,
  );

  if (response.data && response.data.length > 0) {
    thunkAPI.dispatch(getPlaces(response.data[0].id));
    return response.data[0];
  }

  return thunkAPI.rejectWithValue('No such user');
});

export const register = createAsyncThunk('shared/register', async (newUser: UserRegistration) => {
  const checkResponse = await axios.get<TemporaryUser[]>(
    `http://localhost:8000/users?email=${newUser.email}`,
  );
  if (checkResponse.data.length === 1) {
    throw Error('Email already used');
  } else {
    const response = await axios.post<TemporaryUser>('http://localhost:8000/users', newUser);
    return response.data;
  }
});

const initialState = (): SharedState => ({
  loading: false,
  serverErrorMsg: undefined,
  user: undefined,
});

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setLoading: (state: SharedState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setServerErrorMsg: (state: SharedState, action: PayloadAction<string>) => {
      state.serverErrorMsg = action.payload;
    },
    resetServerErrorMsg: (state: SharedState) => {
      state.serverErrorMsg = undefined;
    },
    setUser: (state: SharedState, action: PayloadAction<LoggedUser | undefined>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      sessionStorage.clear();
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.serverErrorMsg = action.payload as string;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = { id: action.payload.id, name: action.payload.name };
      localStorage.setItem('login', action.payload.email);
      sessionStorage.setItem('id', action.payload.id as unknown as string);
      state.loading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.serverErrorMsg = action.error.message;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = { id: action.payload.id, name: action.payload.name };
      sessionStorage.setItem('id', action.payload.id as unknown as string);
    });
  },
});

export const {
  setLoading, setServerErrorMsg, resetServerErrorMsg, setUser,
} = sharedSlice.actions;

export default sharedSlice.reducer;
