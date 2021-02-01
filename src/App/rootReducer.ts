import { combineReducers } from "@reduxjs/toolkit";
import {
  selectedItemsReducer,
  searchReducer,
  ItemReducer,
  shopReducer,
  UIReducer,
  bookmarkReducer
} from "src/slices";

const rootReducer = combineReducers({
  selectedItemsReducer,
  searchReducer,
  ItemReducer,
  shopReducer,
  UIReducer,
  bookmarkReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
