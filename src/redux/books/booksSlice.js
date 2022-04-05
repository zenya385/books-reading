import { createSlice } from "@reduxjs/toolkit";
import {getBooks, addBook, addBookReview} from './booksOperations'

const booksSlice = createSlice({
  name: "books",
  initialState: {
    goingToRead: [],
    currentlyReading: [],
    finishedReading: [],
    isLoading: false
  },
  extraReducers: {
    // ----GET----- //
    [getBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getBooks.fulfilled]: (state, {payload}) => {
      state.goingToRead = payload;
    }
  },
});

export default booksSlice.reducer;
