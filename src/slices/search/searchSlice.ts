import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/App/rootReducer";
import { searchAPI } from "src/lib/api";
import { searchItemLimitPerPage } from "src/lib/data/constants";
import { SearchItem, SearchQuery, SearchSort, SellerLocation } from "src/lib/types";
import { getLocaleStorageSettings } from "src/lib/utils/localStorage";

export interface SearchState {
  items: SearchItem[];
  fetchStatus: "fulfilled" | "pending" | "idle";
  errors: string[];
  query: SearchQuery;
}

const localSettings = getLocaleStorageSettings();

const initialState: SearchState = {
  items: [],
  fetchStatus: "idle",
  errors: [],
  query: {
    keyword: "",
    newest: 0,
    limit: searchItemLimitPerPage,
    order: "desc",
    match_id: 0,
    pay_cod: 0,
    by: localSettings.searchSort,
    locations: localSettings.sellerLocation,
    shopee_verified: localSettings.shopeeVerifiedOnly ? 1 : 0,
    rating_filter: localSettings.itemRatingOnly,
  },
};

export const fetchSearch = createAsyncThunk<
  SearchItem[],
  undefined,
  { rejectValue: string; state: RootState }
>("search/fetchSearch", async (_, { rejectWithValue, dispatch, getState }) => {
  const { query } = getState().searchReducer;
  dispatch(resetPage());
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
    setPriceMin(state, { payload }: PayloadAction<{ priceMin: number }>) {
      state.query.price_min = payload.priceMin;
    },
    setPriceMax(state, { payload }: PayloadAction<{ priceMax: number }>) {
      state.query.price_max = payload.priceMax;
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
    resetPage(state) {
      state.query.newest = 0;
    },
    incrementPage(state) {
      state.query.newest += state.query.limit;
    },
    decrementPage(state) {
      state.query.newest -= state.query.limit;
    },
    setSort(state, { payload }: PayloadAction<{ by: SearchSort }>) {
      state.query.by = payload.by;
    },
    setOrder(state, { payload }: PayloadAction<{ order: "asc" | "desc" }>) {
      state.query.order = payload.order;
    },
    setLocation(state, { payload }: PayloadAction<{ location: SellerLocation }>) {
      const { location } = payload;
      if (state.query.locations.includes(location)) {
        state.query.locations = state.query.locations.filter((l) => l !== payload.location);
      } else {
        state.query.locations.push(payload.location);
      }
    },
    setMatchId(state, { payload }: PayloadAction<{ matchId: number }>) {
      if (state.query.match_id === 0) {
        return;
      }

      state.query.match_id = payload.matchId;
    },
    toggleShopeeVerifiedOnly(state) {
      if (state.query.shopee_verified === 0) {
        state.query.shopee_verified = 1;
      } else {
        state.query.shopee_verified = 0;
      }
    },
    toggleCODOnly(state) {
      if (state.query.pay_cod === 0) {
        state.query.pay_cod = 1;
      } else {
        state.query.pay_cod = 0;
      }
    },
    setRatingFilter(state, { payload }: PayloadAction<{ star: number }>) {
      const { star } = payload;
      state.query.rating_filter = star;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.fetchStatus = "pending";
    });
    builder.addCase(fetchSearch.fulfilled, (state, { payload: items }) => {
      //remove past
      state.items = items;
      state.fetchStatus = "fulfilled";
    });
    builder.addCase(fetchSearch.rejected, (state, { payload }) => {
      state.fetchStatus = "idle";
      state.items = [];
      if (payload) {
        state.errors.push(payload);
      } else {
        state.errors.push("Error");
      }
    });
  },
});

export const {
  setPriceMin,
  setPriceMax,
  setKeyword,
  resetPage,
  incrementPage,
  decrementPage,
  setSort,
  setOrder,
  setLocation,
  setMatchId,
  setRatingFilter,
  toggleShopeeVerifiedOnly,
  toggleCODOnly,
} = searchShopee.actions;
export default searchShopee.reducer;
