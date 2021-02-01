import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/App/rootReducer";
import { getItem, getShopBrief, getRatings } from "src/lib/api";
import { ItemDetailed, Rating, RatingQuery, SearchItem, ShopBrief } from "src/lib/types";

export interface SelectedItem extends SearchItem {
  error: ErrorValues | null | boolean;
  fetchStatus: "fulfilled" | "pending" | "idle";
  type: "brief";
  shop: Partial<SelectedItemShop>;
  ratings: Partial<SelectedItemRatings>;
}

export interface SelectedItemShop extends ShopBrief {
  fetchStatus: "fulfilled" | "pending" | "idle";
  error: ErrorValues | null | boolean;
}

export interface SelectedItemRatings {
  ratings: Rating[];
  fetchStatus: "fulfilled" | "pending" | "idle";
  error: ErrorValues | null | boolean;
}

export interface SelectedItemDetailed extends ItemDetailed {
  error: ErrorValues | null | boolean;
  fetchStatus: "fulfilled" | "pending" | "idle";
  type: "detailed";
  shop: SelectedItemShop;
  ratings: SelectedItemRatings;
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

export const fetchShopBrief = createAsyncThunk<
  { shop: ShopBrief; itemid: number },
  SelectedItem | SelectedItemDetailed,
  { rejectValue: ErrorValues; state: RootState }
>(
  "selectedItems/fetchShopBriefById",
  async ({ itemid, shopid }, { rejectWithValue }) => {
    try {
      const shop = await getShopBrief({ itemid, shopid });

      return { shop, itemid, shopid };
    } catch (err) {
      return rejectWithValue({ message: err.message, itemid, shopid });
    }
  },
  {
    condition: ({ itemid }, { getState }) => {
      const { selectedItems } = getState().selectedItemsReducer;
      const item = selectedItems.find((i) => i.itemid === itemid);
      if (!item || item?.type !== "detailed") return false;

      if (item.shop.fetchStatus == "fulfilled" || item.shop.fetchStatus == "pending") {
        return false;
      }
    },
  }
);

export const fetchItemRatings = createAsyncThunk<
  { ratings: Rating[]; itemid: number; reset: boolean },
  { ratingQuery: RatingQuery; reset?: boolean },
  { rejectValue: ErrorValues; state: RootState }
>(
  "selectedItems/fetchItemRatingsById",
  async ({ ratingQuery, reset = false }, { rejectWithValue }) => {
    const { itemid, shopid } = ratingQuery;

    try {
      const ratings = await getRatings(ratingQuery);
      return { ratings, itemid, shopid, reset };
    } catch (err) {
      return rejectWithValue({
        message: err.message,
        itemid,
        shopid,
      });
    }
  },
  {
    condition: ({ ratingQuery: { itemid } }, { getState }) => {
      const { selectedItems } = getState().selectedItemsReducer;
      const item = selectedItems.find((i) => i.itemid === itemid);
      if (!item || item?.type !== "detailed") return false;

      if (item.ratings.fetchStatus == "pending") {
        return false;
      }
    },
  }
);

export const fetchDetailedItem = createAsyncThunk<
  SelectedItemDetailed,
  SelectedItem | SelectedItemDetailed,
  { rejectValue: ErrorValues; state: RootState }
>(
  "selectedItems/fetchDetailedById",
  async (data, { rejectWithValue }) => {
    const { itemid, shopid } = data;

    try {
      const item = await getItem({ itemid, shopid });
      const newItem = {
        ...item,
        ...data,
        fetchStatus: "fulfilled",
        error: null,
        type: "detailed",
      } as SelectedItemDetailed;
      return newItem;
    } catch (err) {
      return rejectWithValue({ message: err.message, itemid, shopid });
    }
  },
  {
    condition: ({ itemid }, { getState }) => {
      const { selectedItems } = getState().selectedItemsReducer;
      const item = selectedItems.find((i) => i.itemid === itemid);
      if (!item || item?.type !== "brief") return false;

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
    setSelectedItems(
      state,
      action: PayloadAction<{ items: (SelectedItem | SelectedItemDetailed)[] }>
    ) {
      state.selectedItems = action.payload.items;
    },
    selectItem(state, action: PayloadAction<{ item: SearchItem }>) {
      if (state.isEmpty) state.isEmpty = false;

      const { item } = action.payload;
      const newItem: SelectedItem = {
        ...item,
        fetchStatus: "idle",
        error: null,
        type: "brief",
        shop: { fetchStatus: "idle", error: null },
        ratings: { ratings: [], fetchStatus: "idle", error: null },
      };

      state.selectedItems.push(newItem);
    },
    unselectItem(
      state,
      action: PayloadAction<{ selectedItem: any & { itemid: number; shopid: number } }>
    ) {
      if (state.selectedItems.length <= 1) state.isEmpty = true;

      const { selectedItem } = action.payload;
      state.selectedItems = state.selectedItems.filter((i) => selectedItem.itemid !== i.itemid);
    },
    swapFirstAndSecondItems(state) {
      const [firstEl, secondEl, ...rest] = state.selectedItems;
      state.selectedItems = [secondEl, firstEl, ...rest];
    },
    toFirst(state, action: PayloadAction<{ item: any & { itemid: number; shopid: number } }>) {
      const { item } = action.payload;
      const itemIndex = state.selectedItems.findIndex((i) => item.itemid === i.itemid);
      if (itemIndex === -1) return;
      state.selectedItems = [item, ...state.selectedItems.filter((i) => i.itemid !== item.itemid)];
    },
    toSecond(state, action: PayloadAction<{ item: any & { itemid: number; shopid: number } }>) {
      const { item } = action.payload;
      const itemIndex = state.selectedItems.findIndex((i) => item.itemid === i.itemid);
      if (itemIndex === -1) return;
      const [firstEl, ...rest] = state.selectedItems.filter((i) => i.itemid !== item.itemid);
      state.selectedItems = [firstEl, item, ...rest];
    },
    toThird(state, action: PayloadAction<{ item: any & { itemid: number; shopid: number } }>) {
      const { item } = action.payload;
      const itemIndex = state.selectedItems.findIndex((i) => item.itemid === i.itemid);
      if (itemIndex === -1) return;
      const [firstEl, secondEl, ...rest] = state.selectedItems.filter(
        (i) => i.itemid !== item.itemid
      );
      state.selectedItems = [firstEl, secondEl, item, ...rest];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetailedItem.pending, (state, { meta: { arg } }) => {
      const item = state.selectedItems.find((i) => i.itemid === arg.itemid);
      if (!item) return;
      item.fetchStatus = "pending";
    });
    builder.addCase(fetchDetailedItem.fulfilled, (state, { payload: item }) => {
      const { itemid } = item;
      const itemIndex = state.selectedItems.findIndex((i) => i.itemid === itemid);

      if (itemIndex === -1) {
        return;
      } else {
        state.selectedItems.splice(itemIndex, 1, item);
      }
    });
    builder.addCase(fetchDetailedItem.rejected, (state, { payload }) => {
      const item = state.selectedItems.find((i) => i.itemid === payload?.itemid);
      if (!item) {
        return;
      }

      if (payload) {
        item.error = payload;
      } else {
        item.error = true;
      }
      item.fetchStatus = "idle";
    });
    builder.addCase(fetchShopBrief.fulfilled, (state, { payload: shopRes }) => {
      const { shop, itemid } = shopRes;
      const itemIndex = state.selectedItems.findIndex((i) => i.itemid === itemid);

      if (itemIndex === -1) {
        return;
      } else {
        const oldItem = state.selectedItems[itemIndex] as SelectedItemDetailed;
        if (oldItem.shop.fetchStatus === "fulfilled") return;

        const newShop: SelectedItemShop = { ...shop, error: false, fetchStatus: "fulfilled" };

        const newItem = {
          ...oldItem,
          shop: newShop,
        } as SelectedItemDetailed;
        state.selectedItems.splice(itemIndex, 1, newItem);
      }
    });
    builder.addCase(fetchShopBrief.pending, (state, { meta: { arg } }) => {
      const item = state.selectedItems.find((i) => i.itemid === arg.itemid);
      if (!item) return;
      item.shop.fetchStatus = "pending";
    });
    builder.addCase(fetchShopBrief.rejected, (state, { payload }) => {
      const item = state.selectedItems.find((i) => i.itemid === payload?.itemid);
      if (!item) {
        return;
      }

      if (payload) {
        item.error = payload;
      } else {
        item.error = true;
      }
      item.fetchStatus = "idle";
    });
    builder.addCase(fetchItemRatings.pending, (state, { meta: { arg } }) => {
      const item = state.selectedItems.find((i) => i.itemid === arg.ratingQuery.itemid);
      if (!item) return;
      item.ratings.fetchStatus = "pending";
    });
    builder.addCase(fetchItemRatings.fulfilled, (state, { payload: item }) => {
      const { ratings, itemid, reset } = item;
      const itemIndex = state.selectedItems.findIndex((i) => i.itemid === itemid);

      if (itemIndex === -1) {
        return;
      } else {
        const oldItem = state.selectedItems[itemIndex] as SelectedItemDetailed;

        if (reset) {
          // Resetting ratings for when we change type and filter queries
          const newItem = {
            ...oldItem,
            ratings: {
              ratings,
              error: false,
              fetchStatus: "fulfilled",
            },
          } as SelectedItemDetailed;

          state.selectedItems.splice(itemIndex, 1, newItem);
        } else {
          const newItem = {
            ...oldItem,
            ratings: {
              ratings: oldItem.ratings.ratings.concat(ratings),
              error: false,
              fetchStatus: "fulfilled",
            },
          } as SelectedItemDetailed;

          state.selectedItems.splice(itemIndex, 1, newItem);
        }
      }
    });
    builder.addCase(fetchItemRatings.rejected, (state, { payload }) => {
      const item = state.selectedItems.find((i) => i.itemid === payload?.itemid);
      if (!item) {
        return;
      }

      if (payload) {
        item.error = payload;
      } else {
        item.error = true;
      }
      item.fetchStatus = "idle";
    });
  },
});
export const {
  setSelectedItems,
  selectItem,
  unselectItem,
  swapFirstAndSecondItems,
  toFirst,
  toSecond,
  toThird,
} = selectedItemsShopee.actions;
export default selectedItemsShopee.reducer;
