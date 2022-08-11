import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
  currentTab: "search"
};

// Actual Slice
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {

    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },

  },
});

export const { setCurrentTab } = appSlice.actions;

export const selectCurrentTab = (state) => state.app.currentTab;

export default appSlice.reducer;