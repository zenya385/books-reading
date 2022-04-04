import { createSlice } from "@reduxjs/toolkit";

const trainingSlice = createSlice({
  name: "raining",
  initialState: {
    startDate: null,
    endDate: null,
    duration: null,
    pagesPerDay: null,
    stats: {},
    _id: null,
  },
  extraReducers: {},
});

export default trainingSlice.reducer;
