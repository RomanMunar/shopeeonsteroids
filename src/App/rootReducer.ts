import { combineReducers } from "@reduxjs/toolkit";
import {
  bookmarkReducer,
  searchReducer,
  selectedItemsReducer,
  shopReducer,
  UIReducer,
} from "src/slices";

const rootReducer = combineReducers({
  selectedItemsReducer,
  searchReducer,
  shopReducer,
  UIReducer,
  bookmarkReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
