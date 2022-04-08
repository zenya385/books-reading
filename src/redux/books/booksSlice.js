import { createSlice } from "@reduxjs/toolkit";
import { addPlaningTraning, getPlaningTraning } from "../training/trainingOperations";
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
      goingToRead: payload.goingToRead,
      currentlyReading:  payload.currentlyReading,
      finishedReading: payload.finishedReading,
    }),
    [getBooks.rejected]: (state, { payload }) => ({
      ...state,

      error: payload,
    }),

    // [addPlaningTraning.fulfilled]: (state, { payload }) => ({
    //   ...state,
    //   currentlyReading: [...payload.books],
    // }),

    [getPlaningTraning.fulfilled]: (state, { payload }) => ({
      ...state,
      currentlyReading: payload.planning.books,
    }),
  },
});

export default booksSlice.reducer;
