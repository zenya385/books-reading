import { createSlice } from "@reduxjs/toolkit";

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
        startDate: payload,
      };
    },

    getDuration(state, { payload }) {
      return {
        ...state,
        duration: payload,
      };
    },
  },
  extraReducers: {},
});

console.log(trainingSlice);

export default trainingSlice.reducer;
export const {
  changeDateStart,
  changeDateEnd,
  getDuration,
} = trainingSlice.actions;
