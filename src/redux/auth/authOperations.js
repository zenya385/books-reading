import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  loginGoogleUserApi,
  loginUserApi,
  logoutUserApi,
  refreshUserTokenApi,
  registerUserApi,
  getUserApi,
} from "../../utils/fetchApi";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    const { confirmPassword, ...rest } = userData;
    try {
      const data = await registerUserApi(rest);
      console.log("data", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const data = await loginUserApi(userData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// const loginGoogle = (credentials) => async (dispatch) => {
//   const { email, token, name } = credentials;

//   const user = { email, token, name };

//   dispatch(loginRequest());

//   try {
//     dispatch(refreshSuccess(token));
//     dispatch(loginSuccess({ user }));
//   } catch (error) {
//     dispatch(loginError(api.formatError(error)));
//   }
// };
// export const loginGoogle = createAsyncThunk(
//   "auth/loginGoogle",
//   async (obj, thunkApi) => {
//     const { accessToken, refreshToken, sid } = obj;
//     const dispatch = thunkApi.dispatch();
//     dispatch();
//     const state = thunkApi.getState();
//     state.auth.accessToken = accessToken;
//     state.auth.refreshToken = refreshToken;
//     state.auth.sid = sid;
//     try {
//       const { data } = await axios.get("/user/books");
//       state.auth.user.name = data.name;
//       state.auth.user.email = data.email;
//       // return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
// export const loginGoogle = createAsyncThunk(
//   "auth/loginGoogle",
//   async (obj, thunkApi) => {
//     const { accessToken, refreshToken, sid } = obj;
//     try {
//       return { accessToken, refreshToken, sid };
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const persistedToken = state.auth.accessToken;
  try {
    await logoutUserApi(persistedToken);
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const getNewTokens = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const refreshToken = state.auth.refreshToken;
    const sid = state.auth.sid;
    if (!refreshToken) {
      return thunkApi.rejectWithValue();
    }
    try {
      const data = await refreshUserTokenApi({ refreshToken, sid });
      // console.log("data", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const getUser = createAsyncThunk("user/getUser", async (_, thunkApi) => {
//   const state = thunkApi.getState();
//   const accessToken = state.auth.accessToken;
//   try {
//     const user = await getUserApi(accessToken);
//     console.log(user);
//     return user;
//   } catch (error) {
//     return thunkApi.rejectWithValue(error.message);
//   }
// });
