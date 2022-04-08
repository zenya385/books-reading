import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPlanningApi, getPlanningApi } from "../../utils/fetchApi";

export const addPlaningTraning = createAsyncThunk(
  "training/addPlaningTraning",
  async (form, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state.auth.accessToken;
    try {
      const plaining = await addPlanningApi(form, accessToken);
      console.log(plaining);
      return plaining;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getPlaningTraning = createAsyncThunk(
  "training/getPlaningTraning",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state.auth.accessToken;
    try {
      const currentlyReading = await getPlanningApi(accessToken);
      console.log(currentlyReading);
      return currentlyReading;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
