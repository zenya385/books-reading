export const getUserName = (state) => state.auth.user.name;
export const getIsLoading = (state) => state.auth.isLoading;
// export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getIsLoggedIn = (state) => !!state.auth.accessToken;
