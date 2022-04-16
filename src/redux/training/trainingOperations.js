import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPagesApi,
  addPlanningApi,
  getPlanningApi,
} from "../../utils/fetchApi";

export const addPlaningTraining = createAsyncThunk(
  "training/addPlaningTraining",
  async (form, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state.auth.accessToken;
    try {
      const plaining = await addPlanningApi(form, accessToken);
      // console.log(plaining);
      return plaining;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getPlaningTraining = createAsyncThunk(
  "training/getPlaningTraning",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state.auth.accessToken;
    try {
      const currentlyReading = await getPlanningApi(accessToken);
      // console.log(currentlyReading);
      return currentlyReading;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addPages = createAsyncThunk(
  "training/addPages",
  async (pages, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state.auth.accessToken;
    try {
      const data = await addPagesApi(pages, accessToken);
      // console.log("planningPages>>>", data);
      // console.log("getPlanningApi>>>", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
