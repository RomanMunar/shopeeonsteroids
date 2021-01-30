import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookmarkItem } from "src/lib/types";
import {
  addLocalStorageBookmark,
  getLocaleStorageBookmarks,
  removeLocalStorageBookmark,
  updateLocalStorageBookmark,
} from "src/lib/utils/localStorage";

interface BookmarksState {
  bookmarks: BookmarkItem[];
  error: string | null;
}

const initialState: BookmarksState = {
  bookmarks: getLocaleStorageBookmarks(),
  error: null,
};

export const bookmark = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
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
    favoriteBookmark(state, action: PayloadAction<{ bookmark: BookmarkItem }>) {
      const { bookmark } = action.payload;
      const favBookmark = state.bookmarks.find((i) => bookmark.id === i.id);
      if (favBookmark) {
        favBookmark.favorite = true;
      }
    },
    unfavoriteBookmark(state, action: PayloadAction<{ bookmark: BookmarkItem }>) {
      const { bookmark } = action.payload;
      const favBookmark = state.bookmarks.find((i) => bookmark.id === i.id);
      if (favBookmark) {
        favBookmark.favorite = false;
      }
    },
  },
});

export const {
  addBookmarkItem,
  removeBookmarkItem,
  updateBookmarkDescription,
  favoriteBookmark,
  unfavoriteBookmark,
} = bookmark.actions;
export default bookmark.reducer;
