import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { appSlice } from './appSlice';
import { searchSlice } from './searchSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [appSlice.name]: appSlice.reducer,
      [searchSlice.name]: searchSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);