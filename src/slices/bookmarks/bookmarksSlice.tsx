import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookmarkItem } from "src/lib/types";
import { filterByUniqueField } from "src/lib/utils";
import {
  addLocalStorageBookmark,
  getLocaleStorageBookmarks,
  removeLocalStorageBookmark,
  updateLocalStorageBookmark,
} from "src/lib/utils/localStorage";
import { SelectedItem, SelectedItemDetailed } from "../selectedItems/selectedItemsSlice";

interface BookmarksState {
  bookmarks: BookmarkItem[];
  displayedBookmark: BookmarkItem;
  error: string | null;
}

const filteredBookmarks = filterByUniqueField(getLocaleStorageBookmarks(), "id");

const initialState: BookmarksState = {
  bookmarks: filteredBookmarks,
  displayedBookmark: filteredBookmarks[0],
  error: null,
};

export const bookmark = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    previewBookmark(state, action: PayloadAction<{ item: BookmarkItem }>) {
      const { item } = action.payload;
      state.displayedBookmark = item;
    },
    addBookmarkItem(state, action: PayloadAction<{ item: BookmarkItem }>) {
      const { item } = action.payload;
      addLocalStorageBookmark(item);
      state.bookmarks.unshift(item);
    },
    removeBookmarkItem(state, action: PayloadAction<{ item: BookmarkItem }>) {
      const { item } = action.payload;
      removeLocalStorageBookmark(item);
      state.bookmarks = state.bookmarks.filter((i) => item.id !== i.id);
    },
    updateBookmarkTitle(state, action: PayloadAction<{ item: BookmarkItem; newTitle: string }>) {
      const { item, newTitle } = action.payload;
      const newBookmark = state.bookmarks.find((i) => item.id === i.id);
      if (newBookmark) {
        newBookmark.title = newTitle;
        updateLocalStorageBookmark(newBookmark);
      }
    },
    updateBookmarkDescription(
      state,
      action: PayloadAction<{ item: BookmarkItem; newDescription: string }>
    ) {
      const { item, newDescription } = action.payload;

      const newBookmark = state.bookmarks.find((i) => item.id === i.id);
      if (newBookmark) {
        newBookmark.description = newDescription;
        updateLocalStorageBookmark(newBookmark);
      }
    },
    favoriteBookmark(state, action: PayloadAction<{ item: BookmarkItem }>) {
      const { item } = action.payload;
      const favBookmark = state.bookmarks.find((i) => item.id === i.id);
      if (favBookmark) {
        favBookmark.favorite = true;
      }
    },
    unfavoriteBookmark(state, action: PayloadAction<{ item: BookmarkItem }>) {
      const { item } = action.payload;
      const favBookmark = state.bookmarks.find((i) => item.id === i.id);
      if (favBookmark) {
        favBookmark.favorite = false;
      }
    },
    setSelectedBookmarkedItems(
      state,
      action: PayloadAction<{
        id: number;
        newItems: (SelectedItem | SelectedItemDetailed)[];
      }>
    ) {
      const { id, newItems } = action.payload;
      const item = state.bookmarks.find((i) => i.id === id);
      if (item) {
        const newItem = { ...item, items: newItems };
        addLocalStorageBookmark(newItem);
        state.bookmarks = state.bookmarks.filter((i) => i.id !== newItem.id);
        state.bookmarks.unshift(newItem);
      }
    },
    addSelectedBookmarkedItem(
      state,
      action: PayloadAction<{ item: BookmarkItem; newItem: SelectedItem | SelectedItemDetailed }>
    ) {
      const { item, newItem } = action.payload;
      const bookmark = state.bookmarks.find((i) => i.id === item.id);
      if (bookmark) {
        bookmark.items.push(newItem);
        addLocalStorageBookmark({ ...item, items: [newItem, ...item.items] });
      }
    },
    removeSelectedBookmarkedItem(
      state,
      action: PayloadAction<{ item: BookmarkItem; removeItem: SelectedItem | SelectedItemDetailed }>
    ) {
      const { item, removeItem } = action.payload;
      const bookmark = state.bookmarks.find((i) => i.id === item.id);
      if (bookmark) {
        const newItems = bookmark.items.filter((b) => b.itemid !== removeItem.itemid);
        bookmark.items = newItems;
        addLocalStorageBookmark({ ...item, items: newItems });
      }
    },
  },
});

export const {
  previewBookmark,
  addBookmarkItem,
  removeBookmarkItem,
  updateBookmarkDescription,
  updateBookmarkTitle,
  favoriteBookmark,
  unfavoriteBookmark,
  setSelectedBookmarkedItems,
  addSelectedBookmarkedItem,
  removeSelectedBookmarkedItem,
} = bookmark.actions;
export default bookmark.reducer;
