import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiService, { formatError } from '../services/api-service';
import {
  Crudentials, LoggedUser, SharedState, LoggedInViewModel, UserRegistration,
} from '../types/index';
import { getPlaces } from './places-slice';

if (process.env.REACT_APP_AUTH_TOKEN === undefined) {
  throw new Error('env.local is not setuped');
}

export const login = createAsyncThunk<LoggedInViewModel, Crudentials>(
  'shared/login',
  async (crudentials: Crudentials, thunkAPI) => {
    try {
      const response = await ApiService.post<LoggedInViewModel>('/api/auth/login', crudentials);
      thunkAPI.dispatch(getPlaces(response.data.token));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(formatError(error));
    }
  },
);

export const register = createAsyncThunk('shared/register', async (newUser: UserRegistration, thunkAPI) => {
  try {
    const response = await ApiService.post<LoggedInViewModel>('/api/auth/register', newUser);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(formatError(error));
  }
});

export const reload = createAsyncThunk('shared/reload', async (_, thunkAPI) => {
  try {
    const token = sessionStorage.getItem(process.env.REACT_APP_AUTH_TOKEN as string);

    if (!token) {
      throw new Error('Please, re-login.');
    }

    const response = await ApiService.post<LoggedInViewModel>('/api/auth/authenticate', {}, {
      headers: {
        Authorization: token,
      },
    });
    thunkAPI.dispatch(getPlaces(response.data.token));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(formatError(error));
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
    logout: () => {
      // Implementuota index.tsx rootReduceryje, nes reikia visus slic'us pravalyti.
      // https://stackoverflow.com/questions/59061161/how-to-reset-state-of-redux-store-when-using-configurestore-from-reduxjs-toolki
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      sessionStorage.clear();
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      sessionStorage.clear();
      state.serverErrorMsg = action.payload as string;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('login', action.meta.arg.email);
      sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, action.payload.token as unknown as string);
      state.loading = false;
      state.serverErrorMsg = undefined;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      sessionStorage.clear();
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      sessionStorage.clear();
      state.serverErrorMsg = action.error.message;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.serverErrorMsg = undefined;
      state.user = action.payload.user;
      sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, action.payload.token as unknown as string);
    });
    builder.addCase(reload.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(reload.rejected, (state, action) => {
      state.loading = false;
      sessionStorage.clear();
      state.serverErrorMsg = action.payload as string;
    });
    builder.addCase(reload.fulfilled, (state, action) => {
      state.user = action.payload.user;
      sessionStorage.clear();
      sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, action.payload.token as unknown as string);
      state.loading = false;
      state.serverErrorMsg = undefined;
    });
  },
});

export const {
  setLoading, setServerErrorMsg, resetServerErrorMsg, setUser, logout,
} = sharedSlice.actions;

export default sharedSlice.reducer;
