import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/App/rootReducer";
import { searchAPI } from "src/lib/api";
import { Item, SearchQuery } from "src/lib/types";

export interface SearchState {
  items: Item[];
  fetchStatus: "fulfilled" | "pending" | "idle";
  error: string | null | boolean;
  query: SearchQuery;
}

const initialState: SearchState = {
  items: [],
  fetchStatus: "idle",
  error: null,
  query: { keyword: "coffee" },
};

export const fetchSearch = createAsyncThunk<
  Item[],
  undefined,
  { rejectValue: string; state: RootState }
>("search/fetchSearch", async (_, { rejectWithValue, dispatch, getState }) => {
  const { query } = getState().searchReducer;

  dispatch(searchStart());
  try {
    const items = await searchAPI(query);
    return items;
  } catch (e) {
    return rejectWithValue("Error");
  }
});

const searchShopee = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchStart(state) {
      state.fetchStatus = "pending";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, { payload: items }) => {
      //remove past
      console.log(items);
      state.items = items;
      state.fetchStatus = "fulfilled";
    });
    builder.addCase(fetchSearch.rejected, (state, { payload }) => {
      state.fetchStatus = "idle";
      if (payload) {
        state.error = payload;
      } else {
        state.error = true;
      }
    });
  },
});

export const { searchStart } = searchShopee.actions;
export default searchShopee.reducer;
