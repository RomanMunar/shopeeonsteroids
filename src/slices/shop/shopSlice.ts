import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShop } from "src/lib/api";
import { ShopDetailed } from "src/lib/types";

interface SearchState {
  shop: ShopDetailed | null;
  fetchStatus: "fulfilled" | "pending" | "idle";
  error: string | null | boolean;
}

export const fetchShop = createAsyncThunk<
  ShopDetailed,
  { shopid: number },
  { rejectValue: string }
>("search/fetchShop", async ({ shopid }, { rejectWithValue, dispatch }) => {
  dispatch(shopStart());
  try {
    const items = await getShop({ shopid });
    return items;
  } catch (e) {
    return rejectWithValue("Error");
  }
});

const initialState: SearchState = {
  shop: null,
  fetchStatus: "idle",
  error: null,
};

const shopShopee = createSlice({
  name: "shop",
  initialState,
  reducers: {
    shopStart(state) {
      state.fetchStatus = "pending";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShop.fulfilled, (state, { payload: shop }) => {
      //remove past
      state.shop = shop;
      state.fetchStatus = "fulfilled";
    });
    builder.addCase(fetchShop.rejected, (state, { payload }) => {
      state.fetchStatus = "idle";
      if (payload) {
        state.error = payload;
      } else {
        state.error = true;
      }
    });
  },
});

export const { shopStart } = shopShopee.actions;
export default shopShopee.reducer;
