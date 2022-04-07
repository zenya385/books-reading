import { createSlice } from "@reduxjs/toolkit";

const trainingSlice = createSlice({
  name: "training",
  initialState: {
    books: [],
    startDate: new Date(),
    endDate: new Date(),
    duration: null,
    pagesPerDay: null,
    stats: {},
    _id: null,
  },
  reducer: {
    changeDateStart(state, { payload }) {
      console.log(state);
      return {
        
        startDate:  payload ,
        // user: { ...state.user, [payload.name]: payload.value },
      };
    },
  },
  extraReducers: {},
});

export default trainingSlice.reducer;
export const { changeDateStart } = trainingSlice.actions;
