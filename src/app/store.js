import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../feature/filter/filterSlice"
import { apiSlice } from "../feature/api/apiSlice";

export const store =configureStore({
  reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    filter:filterReducer
  },
  middleware:(getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware)
})