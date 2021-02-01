import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookmarkItem } from "src/lib/types";
import { filterByUniqueField } from "src/lib/utils";
import {
  addLocalStorageBookmark,
  getLocaleStorageBookmarks,
  removeLocalStorageBookmark,
  updateLocalStorageBookmark,
} from "src/lib/utils/localStorage";

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
      state.bookmarks.push(item);
    },
    removeBookmarkItem(state, action: PayloadAction<{ item: BookmarkItem }>) {
      const { item } = action.payload;
      removeLocalStorageBookmark(item);
      state.bookmarks.filter((i) => item.id !== i.id);
    },
    updateBookmarkTitle(state, action: PayloadAction<{ item: BookmarkItem; newTitle: string }>) {
      const { item, newTitle } = action.payload;
      updateLocalStorageBookmark(item);
      const newBookmark = state.bookmarks.find((i) => item.id === i.id);
      if (newBookmark) {
        newBookmark.title = newTitle;
      }
    },
    updateBookmarkDescription(
      state,
      action: PayloadAction<{ item: BookmarkItem; newDescription: string }>
    ) {
      const { item, newDescription } = action.payload;
      updateLocalStorageBookmark(item);

      const newBookmark = state.bookmarks.find((i) => item.id === i.id);
      if (newBookmark) {
        newBookmark.description = newDescription;
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
} = bookmark.actions;
export default bookmark.reducer;
