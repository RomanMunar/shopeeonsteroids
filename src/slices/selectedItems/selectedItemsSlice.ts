import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/App/rootReducer";
import { getItem } from "src/lib/api";
import { ItemDetailed, SearchItem } from "src/lib/types";

export interface SelectedItem extends SearchItem {
  error: ErrorValues | null | boolean;
  fetchStatus: "fulfilled" | "pending" | "idle";
}
export interface SelectedItemDetailed extends ItemDetailed {
  error: ErrorValues | null | boolean;
  fetchStatus: "fulfilled" | "pending" | "idle";
}

interface SelectedItemsState {
  selectedItems: (SelectedItem | SelectedItemDetailed)[];
  isEmpty: boolean;
}

const initialState: SelectedItemsState = {
  selectedItems: [],
  isEmpty: true,
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
      const item = selectedItems.find((i) => i.itemid === itemid);
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
    selectItem(state, action: PayloadAction<{ item: SearchItem }>) {
      if (state.isEmpty) state.isEmpty = false;

      const { item } = action.payload;
      const newItem: SelectedItem = { ...item, fetchStatus: "idle", error: null };

      state.selectedItems.push(newItem);
    },
    unselectItem(state, action: PayloadAction<{ selectedItem: SelectedItem | SearchItem }>) {
      if (state.selectedItems.length <= 1) state.isEmpty = true;

      const { selectedItem } = action.payload;
      state.selectedItems = state.selectedItems.filter((i) => selectedItem.itemid !== i.itemid);
    },
    selectedItemStart(state, action: PayloadAction<{ itemid: number }>) {
      const item = state.selectedItems.find((i) => i.itemid === action.payload.itemid);
      if (!item) return;
      item.fetchStatus = "pending";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetailedItem.fulfilled, (state, { payload: item }) => {
      //remove past
      state.selectedItems.filter((i) => i.itemid === item.itemid);
      const newItem = { ...item, fetchStatus: "idle", error: null } as SelectedItemDetailed;
      state.selectedItems.push(newItem);
    });
    builder.addCase(fetchDetailedItem.rejected, (state, { payload }) => {
      const item = state.selectedItems.find((i) => i.itemid !== payload?.itemid);
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
