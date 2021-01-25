import { combineReducers } from "@reduxjs/toolkit";
import { selectedItemsReducer, searchReducer, ItemsReducer, shopReducer } from "src/slices";

const rootReducer = combineReducers({
  selectedItemsReducer,
  searchReducer,
  ItemsReducer,
  shopReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
