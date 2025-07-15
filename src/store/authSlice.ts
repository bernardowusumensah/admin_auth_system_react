import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../services/api.service';
import type { AuthState, LoginRequestDto, LoginResponseDto } from '../types/auth.types';

// Check if there's already a token in localStorage to initialize state
const token = localStorage.getItem('auth_token');
const userString = localStorage.getItem('auth_user');
let user = null;

try {
  if (userString) {
    user = JSON.parse(userString);
  }
} catch (error) {
  // Handle possible JSON parse errors
  console.error('Error parsing stored user data:', error);
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: !!token,
  token: token,
  account: user,
  loading: false,
  error: null
};

// Async thunk for login
export const login = createAsyncThunk<
  LoginResponseDto,
  LoginRequestDto,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    // simulate API call
    // const response = await authApi.login(credentials);

    const res = await apiClient.post<LoginResponseDto>('/auth/login', credentials)
    const response = res.data;
    // Store auth data in localStorage
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_user', JSON.stringify(response.account));
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Login error:', error);
      return rejectWithValue(error?.response?.data?.message || error.message || 'Login failed');
    }
    return rejectWithValue('An unknown error occurred');
  }
});

// Logout action
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  return null;
});

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponseDto>) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.account = action.payload.account;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.account = null;
      });
  }
});

// Export actions and reducer
export const { clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
