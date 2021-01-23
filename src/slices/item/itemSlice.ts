import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "src/App/store"
import { getItem } from "src/lib/api/searchAPI"
import { ItemDetailed } from "src/lib/types"

interface ItemState {
  item: ItemDetailed | null
  loading: boolean
  error: string | null
}

interface ItemLoaded {
  item: ItemDetailed
}

const initialState: ItemState = {
  item: null,
  loading: false,
  error: null,
}

const itemShopee = createSlice({
  name: "item",
  initialState,
  reducers: {
    itemStart(state) {
      state.loading = true
      state.error = null
    },
    itemSuccess(state, action: PayloadAction<ItemLoaded>) {
      const { item } = action.payload
      state.item = item
      state.loading = false
      state.error = null
    },
    itemFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { itemStart, itemSuccess, itemFailure } = itemShopee.actions
export default itemShopee.reducer

export const item = ({ itemid, shopid }: { itemid: number; shopid: number }): AppThunk => async (dispatch) => {
  try {
    dispatch(itemStart())
    const item = await getItem({ itemid, shopid })
    dispatch(itemSuccess({ item }))
  } catch (err) {
    dispatch(itemFailure(err))
  }
}
