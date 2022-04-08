import { createSlice } from "@reduxjs/toolkit";
import {
  addPlaningTraning,
  getPlaningTraning,
} from "../training/trainingOperations";
import { addBook, getBooks, reviewBook } from "./booksOperations";
const booksSlice = createSlice({
  name: "books",
  initialState: {
    goingToRead: [],
    currentlyReading: [],
    finishedReading: [],
    error: null,
    isLoading: false,
    bookRating: {},
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

    [reviewBook.pending]: (state) => ({
      ...state,
      error: null,
      isLoading: true,
    }),
    [reviewBook.fulfilled]: (state, { payload }) => console.log(payload),
    [reviewBook.rejected]: (state, { payload }) => ({
      ...state,

      error: payload,
      isLoading: false,
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
