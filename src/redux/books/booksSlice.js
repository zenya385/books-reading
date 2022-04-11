import { createSlice } from "@reduxjs/toolkit";
import {
  addPlaningTraining,
  // addPlaningTraning,
  getPlaningTraining,
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
    feedback: "",
    rating: null,
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
    [reviewBook.fulfilled]: (state, { payload }) => ({
      ...state,
      feedback: payload.feedback,
      rating: payload.rating,

      isLoading: false,
    }),
    [reviewBook.rejected]: (state, { payload }) => ({
      ...state,

      error: payload,
      isLoading: false,
    }),

    // [addPlaningTraning.fulfilled]: (state, { payload }) => ({
    //   ...state,
    //   currentlyReading: [...payload.books],
    // }),

    [getPlaningTraining.fulfilled]: (state, { payload }) => ({
      ...state,
      currentlyReading: payload.planning.books,
    }),

    [addPlaningTraining.fulfilled]:(state,{payload})=>({
      ...state,
      currentlyReading: payload.books,
    })
  },
});

export default booksSlice.reducer;
