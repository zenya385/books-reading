import { createSlice } from "@reduxjs/toolkit";
import { getNewTokens, login, logout, register } from "./authOperations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    isLoggedIn: false,
    error: null,
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
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    [logout.rejected](state, { payload }) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = payload;
    },
    // [getNewTokens.pending](state) {
    //   state.isLoading = true;
    //   state.error = null;
    // },
    // [getNewTokens.fulfilled](state, { payload }) {
    //   state.user = { payload };
    //   // state.token = null;
    //   state.isLoggedIn = true;
    //   state.isLoading = false;
    //   state.isRefreshingCurrentUser = false;
    // },
    // [getNewTokens.rejected](state, { payload }) {
    //   state.isRefreshingCurrentUser = false;
    //   // state.isLoggedIn = false;
    //   // state.error = payload;
    // },
  },
});

export default authSlice.reducer;
