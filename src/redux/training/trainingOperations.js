import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPlanningApi } from "../../utils/fetchApi";

export const addPlaningTraning = createAsyncThunk(
  "training/addPlaningTraning",
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
