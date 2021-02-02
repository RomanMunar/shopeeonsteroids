import { BookmarkItem } from "src/lib/types";
import { filterByUniqueField } from ".";
import { defaultBookmarks } from "../data/defaultBookmark";
import { defaultSettings, Settings } from "../data/defaultSearchSettings";

type LocalStorageItem = "Bookmarks" | "Settings";

const getLocalStorageItem = <T extends LocalStorageItem>(
  item: T
): T extends "Bookmarks" ? BookmarkItem[] : T extends "Settings" ? Settings : never =>
  JSON.parse(localStorage.getItem(item)!);

const setLocalStorageItem = <T extends LocalStorageItem>(
  item: T,
  payload: T extends "Bookmarks" ? BookmarkItem[] : T extends "Settings" ? Settings : never
) => localStorage.setItem(item, JSON.stringify(payload));

export const getLocaleStorageBookmarks = () => {
  const bookmarks = getLocalStorageItem("Bookmarks");
  if (!bookmarks || bookmarks.length < 1) {
    setLocalStorageBookmarks(defaultBookmarks);
    return defaultBookmarks;
  }
  return filterByUniqueField(bookmarks, "id");
};

export const setLocalStorageBookmarks = (oldBookmarks: BookmarkItem[]) => {
  const bookmarks = filterByUniqueField(oldBookmarks, "id");

  setLocalStorageItem("Bookmarks", bookmarks);
};

export const removeLocalStorageBookmark = (item: BookmarkItem) => {
  const bookmarks = getLocaleStorageBookmarks().filter((b) => b.id !== item.id);
  setLocalStorageBookmarks(bookmarks);
};

export const updateLocalStorageBookmark = (newBookmark: BookmarkItem) => {
  const bookmarks = getLocaleStorageBookmarks().filter((b) => b.id !== newBookmark.id);
  setLocalStorageBookmarks([...bookmarks, newBookmark]);
};

export const addLocalStorageBookmark = (newBookmark: BookmarkItem): BookmarkItem[] => {
  const bookmarks = filterByUniqueField(getLocaleStorageBookmarks(), "id").filter(
    (i) => i.id !== newBookmark.id
  );
  if (!bookmarks) {
    setLocalStorageBookmarks([newBookmark]);
    return [newBookmark];
  }
  setLocalStorageBookmarks([newBookmark, ...bookmarks]);
  return [newBookmark, ...bookmarks];
};

export const updateLocalStorageSettings = (newBookmark: BookmarkItem) => {
  const bookmarks = getLocaleStorageBookmarks().filter((b) => b.id !== newBookmark.id);
  setLocalStorageBookmarks([...bookmarks, newBookmark]);
};

export const getLocaleStorageSettings = () => {
  const settings = getLocalStorageItem("Settings");
  if (!settings) {
    setLocalStorageSettings(defaultSettings);
    return defaultSettings;
  }
  return settings;
};

export const setLocalStorageSettings = (settings: Settings) => {
  setLocalStorageItem("Settings", settings);
};
