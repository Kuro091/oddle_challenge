import { createSlice, current } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { octokit } from '../utils/octokitHelper';

// Initial state
const initialState = {
  searchQuery: "",
  searchResult: {
    incomplete_results: false,
    items: [],
    total_count: 0,
  },
  pending: false,
  error: {},
  statusCode: 0,
  currentPage: 0,
  maxPage: 0,
};

export const getUsersByQuery = createAsyncThunk('search/getUsersByQuery', async ({ searchQuery, per_page, page }) => {
  console.log('search with', searchQuery, per_page, page);
  const response = await octokit.rest.search.users({ q: `${searchQuery} in:login`, per_page, page });
  switch (response?.status) {
    case 200:
      const itemsPromises = response.data.items.map(async (user) => {
        const oneUser = await octokit.rest.users.getByUsername({ username: user.login });
        return { ...user, followers: oneUser?.data.followers, following: oneUser?.data.following };
      });
      const itemsWithFollowCount = await Promise.all(itemsPromises);

      let result = { ...response };
      result.data.items = itemsWithFollowCount;

      const regex = /\&page\=(\d+)/g;
      if (response.headers.link) {
        const matches = response.headers.link.toString().matchAll(regex);
        const arrOfMatches = Array.from(matches).map(match => match[1]);


        // Get the max page number from the response headers
        if (arrOfMatches.length > 2) {
          result.currentPage = parseInt(arrOfMatches[1]);
          result.maxPage = parseInt(arrOfMatches[2]);
        } else {
          const firstNumber = parseInt(arrOfMatches[0]);
          const secondNumber = parseInt(arrOfMatches[1]);
          if (firstNumber < secondNumber) {
            result.currentPage = firstNumber;
            result.maxPage = secondNumber;
          } else {
            result.currentPage = secondNumber;
            result.maxPage = firstNumber;
          }
        }

      }
      return result
    case 401:
      return { error: { message: "Unauthorized" } };
    case 404:
      return { error: { message: "Not Found" } };
    default:
      return { error: { message: "Unknown Error" } };
  }
})


export const getUserByUsername = createAsyncThunk('search/getUserByUsername', async (username) => {
  const response = await octokit.rest.users.getByUsername({ username });

  switch (response?.status) {
    case 200:
      console.log('response.data :', response);
      return response.data
    case 401:
      return { error: { message: "Unauthorized" } };
    case 404:
      return { error: { message: "Not Found" } };
    default:
      return { error: { message: "Unknown Error" } };
  }
})


// Actual Slice
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    setSearchResult(state, action) {
      state.searchResult = action.payload;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action) => {
        console.log('HYDRATE :', action.payload);
        return {
          ...state,
          ...action.payload.search,
        };
      })
      .addCase(getUsersByQuery.pending, (state, action) => {

        state.pending = true;
      })
      .addCase(getUsersByQuery.fulfilled, (state, action) => {
        state.pending = false;
        if (action.payload.error) {
          state.error = action.payload.error;
          return;
        }

        state.searchResult = action.payload.data;
        state.statusCode = action.payload.status;
        state.currentPage = action.payload.currentPage ? action.payload.currentPage : 0;
        state.maxPage = action.payload.maxPage ? action.payload.maxPage : 0;

      })
      .addCase(getUsersByQuery.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      .addCase(getUserByUsername.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(getUserByUsername.fulfilled, (state, action) => {
        state.pending = false;
        if (action.payload.error) {
          state.error = action.payload.error;
          return;
        }

        state.user = action.payload.data;
        state.statusCode = action.payload.status;
      })
      .addCase(getUserByUsername.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
  },

});

export const { setSearchQuery, setSearchResult } = searchSlice.actions;

export const selectSearchState = (state) => state.search;

export default searchSlice.reducer;