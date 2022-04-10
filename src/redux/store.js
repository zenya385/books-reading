import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import booksReducer from "./books/booksSlice";
import themeReducer from "./theme/themeSlice";
import trainingReducer from "./training/trainingSlice";
import langReducer from "./lang/langSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken"],
};
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "lang"],
};

const rootReducer = combineReducers({
  books: booksReducer,
  auth: authPersistedReducer,
  training: trainingReducer,
  theme: themeReducer,
  lang: langReducer,
});

const rootPersistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: rootPersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //   devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export default store;
