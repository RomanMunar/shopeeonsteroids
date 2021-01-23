import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "src/App/store"

import { searchAPI } from "src/lib/api/searchAPI"
import { Item, SearchQuery } from "src/lib/types"

interface SearchState {
  items: Item[]
  loading: boolean
  error: string | null
}

interface SearchLoaded {
  items: Item[]
}

const initialState: SearchState = {
  items: [],
  loading: false,
  error: null,
}

const searchShopee = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchStart(state) {
      state.loading = true
      state.error = null
    },
    searchSuccess(state, action: PayloadAction<SearchLoaded>) {
      const { items } = action.payload
      state.items = items
      state.loading = false
      state.error = null
    },
    searchFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { searchStart, searchSuccess, searchFailure } = searchShopee.actions
export default searchShopee.reducer

export const search = (query: SearchQuery): AppThunk => async (dispatch) => {
  try {
    dispatch(searchStart())
    const items = await searchAPI(query)
    dispatch(searchSuccess({ items }))
  } catch (err) {
    dispatch(searchFailure(err))
  }
}
