import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserApi,
  logoutUserApi,
  refreshUserTokenApi,
  registerUserApi,
} from "../../utils/fetchApi";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    const { confirmPassword, ...rest } = userData;
    try {
      const data = await registerUserApi(rest);
      // console.log("data", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const data = await loginUserApi(userData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const persistedToken = state.auth.accessToken;
  try {
    await logoutUserApi(persistedToken);
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const getNewTokens = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const refreshToken = state.auth.refreshToken;
    const sid = state.auth.sid;
    if (!refreshToken) {
      return thunkApi.rejectWithValue();
    }
    try {
      const data = await refreshUserTokenApi({ refreshToken, sid });
      // console.log("data", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
