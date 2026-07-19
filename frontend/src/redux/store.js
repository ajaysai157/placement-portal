import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const storage = createWebStorage("local");

const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  authReducer
);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;