import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "lang",
  initialState: "light",
  reducers: {
    changeTheme(state, { payload }) {
      return payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
