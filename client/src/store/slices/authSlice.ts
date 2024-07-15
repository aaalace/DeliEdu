import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from "../../types/states/authState.ts";
import { AuthResponse } from "../../types/responses/authResponse.ts";
import User from "../../types/entities/user";

const initialState: AuthState = {
  user: null,
  accessToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess(state, action: PayloadAction<AuthResponse>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    authLogout(state) {
      state.user = null;
      state.accessToken = null;
    },
    authChangeCity(state, action: PayloadAction<User>) {
      state.user.defaultCity = action.payload.defaultCity;
    },
  }
})

export const { authSuccess, authLogout, authChangeCity } = authSlice.actions;
export const authReducer = authSlice.reducer;