import { Flex, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkItem } from "src/lib/types";
import {
  removeBookmarkItem as bookmarkItemRemove,
  updateBookmarkDescription as bookmarkDescriptionUpdate,
  updateBookmarkTitle as bookmarkTitleUpdate,
  favoriteBookmark as bookmarkFavorite,
  unfavoriteBookmark as bookmarkUnfavorite,
  previewBookmark as bookmarkPreview,
} from "src/slices/bookmarks/bookmarksSlice";
import { openComparePanel } from "src/slices/ui/UISlice";
import {
  setSelectedItems,
  setSessionID,
  setIsFromBookmarks,
} from "src/slices/selectedItems/selectedItemsSlice";
import { RootState } from "../rootReducer";
import { BookmarksPanel } from "./BookmarksPanel";
import { BookmarkPreviewPanel } from "./BookmarkPreviewPanel";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { bookmarks, displayedBookmark } = useSelector((state: RootState) => state.bookmarkReducer);
  const updateBookmarkDescription = (item: BookmarkItem, newDescription: string) =>
    dispatch(bookmarkDescriptionUpdate({ item, newDescription }));
  const updateBookmarkTitle = (item: BookmarkItem, newTitle: string) =>
    dispatch(bookmarkTitleUpdate({ item, newTitle }));
  const removeBookmarkItem = (item: BookmarkItem) => {
    if (bookmarks.length <= 1) {
      toast({
        position: "top",
        status: "warning",
        isClosable: true,
        title: "Can't remove bookmark",
        description: "Can't remove last bookmark, Must have a bookmark",
      });
      return;
    }
    dispatch(bookmarkItemRemove({ item }));
  };
  const previewBookmark = (item: BookmarkItem) => {
    if (item.id === displayedBookmark.id) return;
    dispatch(bookmarkPreview({ item }));
  };
  const compareBookmarkItems = (item: BookmarkItem) => {
    dispatch(setSelectedItems({ items: item.items }));
    dispatch(openComparePanel());
    dispatch(setSessionID({ sessionID: item.id }));
    dispatch(setIsFromBookmarks({ isFromBookmarks: true }));
    navigate("/search");
  };
  return (
    <Flex overflowY="hidden" h="100vh" w="full" flexDirection="row">
      <BookmarksPanel
        previewBookmark={previewBookmark}
        displayedBookmark={displayedBookmark}
        bookmarks={bookmarks}
        updateBookmarkDescription={updateBookmarkDescription}
        updateBookmarkTitle={updateBookmarkTitle}
        removeBookmarkItem={removeBookmarkItem}
      />
      <BookmarkPreviewPanel
        displayedBookmark={displayedBookmark}
        compareBookmarkItems={compareBookmarkItems}
      />
    </Flex>
  );
};

export default Bookmarks;
