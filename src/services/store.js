import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlices/GraphSlice";
import { tokenSlice } from "./apiSlices/TokenSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [tokenSlice.reducerPath]: tokenSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,tokenSlice.middleware),
});

export default store;
