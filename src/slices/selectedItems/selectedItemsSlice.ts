import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/App/rootReducer";
import { getItem } from "src/lib/api";
import { Item, ItemDetailed } from "src/lib/types";

interface SelectedItem {
  item: Item | ItemDetailed;
  error: ErrorValues | null | boolean;
  fetchStatus: "fulfilled" | "pending" | "idle";
}

interface SelectedItemsState {
  selectedItems: SelectedItem[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

interface ErrorValues {
  message: string;
  itemid: number;
  shopid: number;
}

export const fetchDetailedItem = createAsyncThunk<
  ItemDetailed,
  {
    itemid: number;
    shopid: number;
  },
  { rejectValue: ErrorValues; state: RootState }
>(
  "selectedItems/fetchDetailedById",
  async (data, { rejectWithValue, dispatch }) => {
    const { itemid, shopid } = data;

    dispatch(selectedItemStart({ itemid }));

    try {
      return await getItem({ itemid, shopid });
    } catch (err) {
      return rejectWithValue({ message: err.message, itemid, shopid });
    }
  },
  {
    condition: ({ itemid }, { getState }) => {
      const { selectedItems } = getState().selectedItemsReducer;
      const item = selectedItems.find((i) => i.item.itemid === itemid);
      if (item?.fetchStatus == "fulfilled" || item?.fetchStatus == "pending") {
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
    },
  }
);

export const selectedItemsShopee = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<{ item: Item }>) {
      const { item } = action.payload;
      const newItem: SelectedItem = { item, fetchStatus: "idle", error: null };

      state.selectedItems.push(newItem);
    },
    unselectItem(state, action: PayloadAction<{ selectedItem: SelectedItem }>) {
      const { selectedItem } = action.payload;
      state.selectedItems.filter((i) => selectedItem.item.itemid === i.item.itemid);
    },
    selectedItemStart(state, action: PayloadAction<{ itemid: number }>) {
      const item = state.selectedItems.find((i) => i.item.itemid === action.payload.itemid);
      if (!item) return;
      item.fetchStatus = "pending";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetailedItem.fulfilled, (state, { payload: item }) => {
      //remove past
      state.selectedItems.filter((i) => i.item.itemid === item.itemid);
      const newItem = { item, fetchStatus: "idle", error: null } as SelectedItem;
      state.selectedItems.push(newItem);
    });
    builder.addCase(fetchDetailedItem.rejected, (state, { payload }) => {
      const item = state.selectedItems.find((i) => i.item.itemid !== payload?.itemid);
      if (!item) {
        return;
      }

      if (payload) {
        item.error = payload;
      } else {
        item.error = true;
      }
    });
  },
});
export const { selectItem, unselectItem, selectedItemStart } = selectedItemsShopee.actions;
export default selectedItemsShopee.reducer;
