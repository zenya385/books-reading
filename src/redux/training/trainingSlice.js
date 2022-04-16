import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/authSlice";
import {
  addPages,
  addPlaningTraining,
  getPlaningTraining,
} from "./trainingOperations";

const trainingSlice = createSlice({
  name: "training",
  initialState: {
    books: [],
    startDate: "", //new Date()
    endDate: "", //new Date()
    duration: 0,
    pagesPerDay: 0,
    stats: [],
    _id: null,
    error: null,
    isTrain: false,
  },
  reducers: {
    resetTrain(state) {
      return {
        books: [],
        startDate: "", //new Date()
        endDate: "", //new Date()
        duration: 0,
        pagesPerDay: 0,
        stats: [],
        _id: null,
        isTrain: false,
      };
    },

    changeDateStart(state, { payload }) {
      return {
        ...state,
        startDate: payload,
      };
    },

    changeDateEnd(state, { payload }) {
      return {
        ...state,
        endDate: payload,
      };
    },

    getDuration(state, { payload }) {
      return {
        ...state,
        duration: payload,
      };
    },

    addBookForTraining(state, { payload }) {
      return {
        ...state,
        books: [...state.books, payload.valueIdBook],
      };
    },

    addCurBookForTraining(state, { payload }) {
      return {
        ...state,
        payload,
      };
    },
  },
  extraReducers: {
    [addPlaningTraining.pending]: (state) => ({
      ...state,
      error: null,
    }),
    [addPlaningTraining.fulfilled]: (state, { payload }) => ({
      ...state,
      startDate: payload.startDate,
      endDate: payload.endDate,
      duration: payload.duration,
      pagesPerDay: payload.pagesPerDay,
      stats: payload.stats,
      _id: payload._id,
      isTrain: true,
    }),
    [addPlaningTraining.rejected]: (state, { payload }) => ({
      ...state,

      error: payload,
    }),
    [getPlaningTraining.pending]: (state) => ({
      ...state,
      error: null,
    }),
    [getPlaningTraining.fulfilled]: (state, { payload }) => ({
      ...state,
      ...payload.planning,
      error: null,
    }),
    [getPlaningTraining.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [addPages.pending]: (state) => ({
      ...state,
      error: null,
    }),
    [addPages.fulfilled]: (state, { payload }) => ({
      ...state,
      books: state.books.map((book) =>
        book._id === payload.book._id ? payload.book : book
      ),
      stats: [...payload.planning.stats],
      error: null,
    }),
    [addPages.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [logoutUser]: (state) => {
      state.books = [];
      state.startDate = "";
      state.endDate = "";
      state.duration = 0;
      state.pagesPerDay = 0;
      state.stats = [];
      state._id = null;
      state.error = null;
      state.isTrain = false;
    },
  },
});

export default trainingSlice.reducer;
export const {
  changeDateStart,
  changeDateEnd,
  getDuration,
  addBookForTraining,
  addCurBookForTraining,
  resetTrain,
} = trainingSlice.actions;
