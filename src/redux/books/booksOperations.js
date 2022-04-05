import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBookApi } from "../../utils/fetchApi";

export const addBook = createAsyncThunk(
  "book/addBook",
  async (newBook, thunkApi) => {
    try {
      const book = await addBookApi(newBook);
      return book;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
