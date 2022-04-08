import { createSlice } from "@reduxjs/toolkit";
import { addBook, getBooks } from "./booksOperations";
const booksSlice = createSlice({
  name: "books",
  initialState: {
    goingToRead: [],
    currentlyReading: [],
    finishedReading: [],
    error: null,
    isLoading: false,
  },
  extraReducers: {
    [addBook.pending]: (state) => ({
      ...state,
      error: null,
    }),
    [addBook.fulfilled]: (state, { payload }) => ({
      ...state,
      goingToRead: [...state.goingToRead, payload],
    }),
    [addBook.rejected]: (state, { payload }) => ({
      ...state,

      error: payload,
    }),
    [getBooks.pending]: (state) => ({
      ...state,
      error: null,
      isLoading: true,
    }),
    [getBooks.fulfilled]: (state, { payload }) => ({
      ...state,
      goingToRead: payload.goingToRead,
      currentlyReading: payload.currentlyReading,
      finishedReading: payload.finishedReading,
      isLoading: false,
    }),
    [getBooks.rejected]: (state, { payload }) => ({
      ...state,

      error: payload,
      isLoading: false,
    }),
  },
});

export default booksSlice.reducer;
