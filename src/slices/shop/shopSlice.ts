import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "src/App/store"
import { getShop } from "src/lib/api/searchAPI"
import { ShopDetailed } from "src/lib/types"

interface SearchState {
  shop: ShopDetailed | null
  loading: boolean
  error: string | null
}

interface ShopLoaded {
  shop: ShopDetailed
}

const initialState: SearchState = {
  shop: null,
  loading: false,
  error: null,
}

const shopShopee = createSlice({
  name: "shop",
  initialState,
  reducers: {
    shopStart(state) {
      state.loading = true
      state.error = null
    },
    shopSuccess(state, action: PayloadAction<ShopLoaded>) {
      const { shop } = action.payload
      state.shop = shop
      state.loading = false
      state.error = null
    },
    shopFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { shopStart, shopSuccess, shopFailure } = shopShopee.actions
export default shopShopee.reducer

export const shop = ({ shopid }: { shopid: number }): AppThunk => async (dispatch) => {
  try {
    dispatch(shopStart())
    const shop = await getShop({ shopid })
    dispatch(shopSuccess({ shop }))
  } catch (err) {
    dispatch(shopFailure(err))
  }
}
