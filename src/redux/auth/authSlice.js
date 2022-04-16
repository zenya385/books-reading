import { createSlice } from "@reduxjs/toolkit";
import { getNewTokens, login, logout, register } from "./authOperations";
import { getBooks } from "../books/booksOperations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    accessToken: null,
    refreshToken: null,
    sid: null,
    isLoading: false,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    setGoogleData(state, { payload }) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.user = { name: null, email: null };
      state.accessToken = null;
      state.refreshToken = null;
      state.sid = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [register.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [register.rejected](state, { payload }) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = payload;
    },
    [login.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled](state, { payload }) {
      state.user.name = payload.userData.name;
      state.user.email = payload.userData.email;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [login.rejected](state, { payload }) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = payload;
    },
    [logout.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [logout.fulfilled](state) {
      state.user = { name: null, email: null };
      state.accessToken = null;
      state.refreshToken = null;
      state.sid = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    [logout.rejected](state, { payload }) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = payload;
    },
    [getNewTokens.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [getNewTokens.fulfilled](state, { payload }) {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        ...payload,
      };
    },
    [getNewTokens.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    [getBooks.fulfilled](state, { payload }) {
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.isLoggedIn = true;
    },
  },
});
export const { setGoogleData, logoutUser } = authSlice.actions;
export default authSlice.reducer;
