import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    accessToken: null,
    refreshToken: false,
    isLoading: false,
    isLoggedIn: false,
    error: null,
  },
  extraReducers: {},
});

export default authSlice.reducer;
