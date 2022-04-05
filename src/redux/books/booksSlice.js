import { createSlice } from "@reduxjs/toolkit";
import { addBook, getBooks } from "./booksOperations";
const booksSlice = createSlice({
  name: "books",
  initialState: {
    goingToRead: [],
    currentlyReading: [],
    finishedReading: [],
    error: null,
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
    }),
    [getBooks.fulfilled]: (state, { payload }) => ({
      ...state,
      goingToRead: [...state.goingToRead, payload.goingToRead.goingToRead],
      // currentlyReading: [...state.currentlyReading, payload.currentlyReading],
      // finishedReading: [...state.finishedReading, payload.finishedReading],
    }),
    [getBooks.rejected]: (state, { payload }) => ({
      ...state,

      error: payload,
    }),
  },
});

export default booksSlice.reducer;
