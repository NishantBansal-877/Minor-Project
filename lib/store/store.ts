"use client";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user-slice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { labReducer } from "./slices/lab-slice";
import { authReducer } from "./slices/auth-slice";

const persistConfig = {
  key: "user",
  storage,
};

const persistLabConfig = {
  key: "lab",
  storage,
};

const persistAuthConfig = {
  key: "auth",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedLabReducer = persistReducer(persistLabConfig, labReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    lab: persistedLabReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
