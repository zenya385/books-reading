import { createSlice } from "@reduxjs/toolkit";

const trainingSlice = createSlice({
  name: "training",
  initialState: {
    books:[],
    startDate: new Date(),
    endDate:new Date(),
    duration: null,
    pagesPerDay: null,
    stats: {},
    _id: null,
  },
  extraReducers: {},
});

export default trainingSlice.reducer;
