import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/App/rootReducer";
import { searchAPI } from "src/lib/api";
import { Item, SearchQuery, SellerLocation, Sort } from "src/lib/types";

export interface SearchState {
  items: Item[];
  fetchStatus: "fulfilled" | "pending" | "idle";
  errors: string[];
  query: SearchQuery;
}

const initialState: SearchState = {
  items: [],
  fetchStatus: "idle",
  errors: [],
  query: {
    keyword: "coffee",
    minPrice: 0,
    maxPrice: 0,
    newest: 20,
    limit: 20,
    order: "desc",
    by: "sales",
    locations: "-2",
    matchId: 0,
  },
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
    return rejectWithValue("Errors");
  }
});

const searchShopee = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchStart(state) {
      state.fetchStatus = "pending";
    },
    setPriceMin(state, { payload }: PayloadAction<{ priceMin: number }>) {
      if (state.query.minPrice > state.query.maxPrice) {
        state.errors.push("Mininum Price should be less than the maximum price");
        return;
      }
      state.query.minPrice = payload.priceMin;
    },
    setPriceMax(state, { payload }: PayloadAction<{ priceMax: number }>) {
      if (state.query.maxPrice === 0) {
        return;
      }
      if (state.query.minPrice > state.query.maxPrice) {
        state.errors.push("Maximum Price should be greater than the minimum price");
        return;
      }
      state.query.maxPrice = payload.priceMax;
    },
    setKeyword(state, { payload }: PayloadAction<{ keyword: string }>) {
      if (payload.keyword === "") {
        return;
      }
      if (payload.keyword === state.query.keyword) {
        return;
      }
      state.query.keyword = payload.keyword.trim().toLowerCase();
    },
    setPage(state, { payload }: PayloadAction<{ pageNumber: number }>) {
      if (payload.pageNumber === 0) {
        return;
      }
      state.query.newest = payload.pageNumber * state.query.limit;
    },
    setSort(state, { payload }: PayloadAction<{ by: Sort }>) {
      if (state.query.by === payload.by) {
        return;
      }
      state.query.by = payload.by;
    },
    setOrder(state, { payload }: PayloadAction<{ order: "asc" | "desc" }>) {
      if (state.query.order === payload.order) {
        return;
      }
      state.query.order = payload.order;
    },
    setLocation(state, { payload }: PayloadAction<{ location: SellerLocation | "-2" }>) {
      // -2 === All
      if (payload.location === "-2") {
        state.query.locations = "-2";
      } else if (state.query.locations !== "-2") {
        state.query.locations.push(payload.location);
      }
    },
    setMatchId(state, { payload }: PayloadAction<{ matchId: number }>) {
      // -2 === All
      if (state.query.matchId === 0) {
        return;
      }

      state.query.matchId = payload.matchId;
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
        state.errors.push(payload);
      } else {
        state.errors.push("Error");
      }
    });
  },
});

export const {
  searchStart,
  setPriceMin,
  setPriceMax,
  setKeyword,
  setPage,
  setSort,
  setOrder,
  setLocation,
  setMatchId,
} = searchShopee.actions;
export default searchShopee.reducer;
