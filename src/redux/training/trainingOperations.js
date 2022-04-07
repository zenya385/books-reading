import { createAsyncThunk } from "@reduxjs/toolkit";

export const planingTraning = createAsyncThunk(
  "training/addPlainingTraining",
  async ({ startDate, endDate, books }, thunkApi) => {
    try {
      const plaining = await addPlanningApi({ startDate, endDate, books });
      console.log(plaining);
      return plaining;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
