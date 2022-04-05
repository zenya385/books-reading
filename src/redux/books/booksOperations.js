import { createAsyncThunk } from "@reduxjs/toolkit";
import {getUserBooksApi, addBookApi, addBookReviewApi} from '../../utils/fetchApi'

export const getBooks = createAsyncThunk('get/books', async (_,thunkApi) => {
    try {
        const result = await getUserBooksApi()
        return result.data
    } catch (error) {
        thunkApi.rejectWithValue(error.message)
    }
})

export const addBook = createAsyncThunk('add/book', async (newBook, thunkApi) => {
    try {
        const result = await addBookApi(newBook)
        return result.data
    } catch (error){
        thunkApi.rejectWithValue(error.message)
    }
})

export const addBookReview = createAsyncThunk('add/review', async ( book, thunkApi) => {
    try {
        const result = await addBookReview(book)
        return result.data
    } catch (error) {
        thunkApi.rejectWithValue(error.message)
    }
})

