import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState = {
  authState: false,
  liked: [],
  searchResult: {
    incomplete_results: false,
    items: [],
    total_count: 0,
  },
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

    setLiked(state, action) {
      state.liked = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      // [HYDRATE]: (state, action) => {
      //   return {
      //     ...state,
      //     ...action.payload.auth,
      //   };
      // },
    },

  },
});

export const { setAuthState, setLiked } = authSlice.actions;

export const selectAuthState = (state) => state.auth.authState;
export const selectLiked = (state) => state.auth.liked;

export default authSlice.reducer;