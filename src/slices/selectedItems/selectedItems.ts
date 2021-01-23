import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getItem } from "src/lib/api/searchAPI"
import { Item, ItemDetailed } from "src/lib/types"

interface SelectedItem {
  item: Item | ItemDetailed
  loading: boolean
  error: string | null
}

interface SelectedItemsState {
  selectedItems: SelectedItem[]
  loading: boolean
  error: string | null
}

interface ValidationErrors {
  messag: string
}

const initialState: SelectedItemsState = {
  selectedItems: [],
  loading: true,
  error: null,
}

const selectedItemsShopee = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<{ item: Item }>) {
      const { item } = action.payload
      const newItem = { item, loading: false, error: null }

      state.selectedItems.push(newItem)
    },
    unselectItem(state, action: PayloadAction<{ item: Item }>) {
      const { item } = action.payload
      state.selectedItems.filter((i) => item.itemid === i.item.itemid)
    },
  },
})
export const { selectItem, unselectItem } = selectedItemsShopee.actions
export default selectedItemsShopee.reducer

export const getDetailedItem = createAsyncThunk<
  ItemDetailed,
  { itemid: number; shopid: number },
  {
    rejectValue: ValidationErrors
  }
>("users/fetchByItemIdStatus", async (data, { rejectWithValue }) => {
  try {
    const { itemid, shopid } = data
    const newItem = await getItem({ itemid, shopid })
    return newItem
  } catch (err) {
    return rejectWithValue(err.msg)
  }
})
