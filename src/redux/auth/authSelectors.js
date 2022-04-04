import { useSelector } from "react-redux";

export const getUserName = (state) => state.auth.user.name;
export const getIsLoading = (state) => state.auth.isLoading;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
