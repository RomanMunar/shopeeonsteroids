import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "src/lib/types";

interface Bookmark {
  id: number;
  favorite: boolean;
  title: string;
  description: string;
  items: Item[];
}

interface BookmarksState {
  bookmarks: Bookmark[];
  error: string | null;
}

const initialState: BookmarksState = {
  bookmarks: [],
  error: null,
};

export const selectedItemsShopee = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    bookmarkItem(state, action: PayloadAction<{ item: Bookmark }>) {
      const { item } = action.payload;

      state.bookmarks.push(item);
    },
    unbookmarkItem(state, action: PayloadAction<{ bookmark: Bookmark }>) {
      const { bookmark } = action.payload;
      state.bookmarks.filter((i) => bookmark.id !== i.id);
    },
    updateBookmarkTitle(state, action: PayloadAction<{ bookmark: Bookmark; newTitle: string }>) {
      const { bookmark, newTitle } = action.payload;
      const newBookmark = state.bookmarks.find((i) => bookmark.id === i.id);
      if (newBookmark) {
        newBookmark.title = newTitle;
      }
    },
    updateBookmarkDescription(
      state,
      action: PayloadAction<{ bookmark: Bookmark; newDescription: string }>
    ) {
      const { bookmark, newDescription } = action.payload;
      const newBookmark = state.bookmarks.find((i) => bookmark.id === i.id);
      if (newBookmark) {
        newBookmark.description = newDescription;
      }
    },
    favoriteBookmark(state, action: PayloadAction<{ bookmark: Bookmark }>) {
      const { bookmark } = action.payload;
      const favBookmark = state.bookmarks.find((i) => bookmark.id === i.id);
      if (favBookmark) {
        favBookmark.favorite = true;
      }
    },
    unFavoriteBookmark(state, action: PayloadAction<{ bookmark: Bookmark }>) {
      const { bookmark } = action.payload;
      const favBookmark = state.bookmarks.find((i) => bookmark.id === i.id);
      if (favBookmark) {
        favBookmark.favorite = false;
      }
    },
  },
});

export const { bookmarkItem, unbookmarkItem } = selectedItemsShopee.actions;
export default selectedItemsShopee.reducer;
