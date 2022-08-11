import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { octokit } from '../utils/octokitHelper';

// Initial state
const initialState = {
  authState: false,
  liked: [],
  searchResult: {
    incomplete_results: false,
    items: [],
    total_count: 0,
  },
  pending: false,
  error: null
};

export const getUsersByUsername = createAsyncThunk("auth/getUsersByUsername", async (usernames) => {

  const result = await Promise.all(usernames.map(async (username) => {
    const oneUser = await octokit.rest.users.getByUsername({ username });
    return oneUser.data;
  }));

  console.log('result ', result);
  return result;
});

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

    setAuthSearchResult(state, action) {
      state.searchResult = action.payload;
    },

    setAuthPending(state, action) {
      state.pending = action.payload;
    }
  },

  extraReducers: builder => {
    builder
      .addCase(getUsersByUsername.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getUsersByUsername.fulfilled, (state, action) => {
        state.pending = false;
        state.searchResult = {};
        state.searchResult.items = action.payload;
        state.searchResult.total_count = action.payload.length;
      })
      .addCase(getUsersByUsername.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
  }

});

export const { setAuthState, setLiked, setAuthPending, setAuthSearchResult } = authSlice.actions;

export const selectAuthPending = (state) => state.auth.pending;
export const selectLiked = (state) => state.auth.liked;

export default authSlice.reducer;