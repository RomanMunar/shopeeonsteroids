import { combineReducers } from "@reduxjs/toolkit";
import {
  selectedItemsReducer,
  searchReducer,
  ItemReducer,
  shopReducer,
  UIReducer,
} from "src/slices";

const rootReducer = combineReducers({
  selectedItemsReducer,
  searchReducer,
  ItemReducer,
  shopReducer,
  UIReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
