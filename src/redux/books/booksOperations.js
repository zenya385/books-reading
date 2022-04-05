import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBookApi, getUserBooksApi } from "../../utils/fetchApi";

export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook, thunkApi) => {
    try {
      const book = await addBookApi(newBook);
      // console.log(book);
      return book;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (_, thunkApi) => {
    try {
      const books = await getUserBooksApi();
      console.log(books);
      return books;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
