export { default as selectedItemsReducer } from "./selectedItems/selectedItemsSlice";
export type { SelectedItem } from "./selectedItems/selectedItemsSlice";
export { default as searchReducer } from "./search/searchSlice";
export { default as ItemReducer } from "./item/itemSlice";
export { default as shopReducer } from "./shop/shopSlice";
export { default as UIReducer } from "./ui/UISlice";
export { default as bookmarkReducer } from "./bookmarks/bookmarksSlice";

export type CompareLayout = "double" | "triple";
