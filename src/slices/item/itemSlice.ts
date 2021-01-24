import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "src/lib/api";
import { ItemDetailed } from "src/lib/types";

interface ItemState {
  item: ItemDetailed | null;
  fetchStatus: "fulfilled" | "pending" | "idle";
  error: string | null | boolean;
}

export const fetchDisplayDetailedItem = createAsyncThunk<
  ItemDetailed,
  { itemid: number; shopid: number },
  { rejectValue: string }
>("selectedItems/fetchDetailedById", async (data, { rejectWithValue, dispatch }) => {
  const { itemid, shopid } = data;

  dispatch(itemStart());

  try {
    return await getItem({ itemid, shopid });
  } catch (err) {
    return rejectWithValue("Error");
  }
});
const initialState: ItemState = {
  item: null,
  fetchStatus: "idle",
  error: null,
};

const itemShopee = createSlice({
  name: "item",
  initialState,
  reducers: {
    itemStart(state) {
      state.fetchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDisplayDetailedItem.fulfilled, (state, { payload: item }) => {
      //remove past
      state.item = item;
      state.fetchStatus = "fulfilled";
      state.error = null;
    });
    builder.addCase(fetchDisplayDetailedItem.rejected, (state, { payload }) => {
      state.fetchStatus = "fulfilled";
      if (payload) {
        state.error = payload;
      } else {
        state.error = true;
      }
    });
  },
});

export const { itemStart } = itemShopee.actions;
export default itemShopee.reducer;
