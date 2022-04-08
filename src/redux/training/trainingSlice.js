import { createSlice } from "@reduxjs/toolkit";
import { addPlaningTraning } from "./trainingOperations";

const trainingSlice = createSlice({
  name: "training",
  initialState: {
    books: [],
    startDate: "", //new Date()
    endDate: "", //new Date()
    duration: 0,
    pagesPerDay: 0,
    stats: {},
    _id: null,
  },
  reducers: {
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
      console.log(state);
      return {
        ...state,
        duration: payload,
      };
    },

    addBookForTraining(state, { payload }) {
      console.log(payload.valueIdBook);
      console.log(state.books);
      return {
        ...state,
        books: [...state.books, payload.valueIdBook],
      };
    },
  },
  extraReducers: {
    [addPlaningTraning.pending]: (state) => ({
      ...state,
      error: null,
    }),
    [addPlaningTraning.fulfilled]: (state, { payload }) => ({
      ...state,
      // books: [ payload.books],
      startDate: payload.startDate,
      endDate: payload.endDate,
      duration: payload.duration,
      pagesPerDay: payload.pagesPerDay,
      stats: payload.stats,
      _id: payload._id,
    }),
    [addPlaningTraning.rejected]: (state, { payload }) => ({
      ...state,

      error: payload,
    }),
  },
});

console.log(trainingSlice);

export default trainingSlice.reducer;
export const {
  changeDateStart,
  changeDateEnd,
  getDuration,
  addBookForTraining,
} = trainingSlice.actions;
