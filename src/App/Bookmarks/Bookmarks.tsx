import { Flex, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookmarkItem } from "src/lib/types";
import {
  previewBookmark as bookmarkPreview,
  removeBookmarkItem as bookmarkItemRemove,
  updateBookmarkDescription as bookmarkDescriptionUpdate,
  updateBookmarkTitle as bookmarkTitleUpdate,
} from "src/slices/bookmarks/bookmarksSlice";
import {
  setIsFromBookmarks,
  setSelectedItems,
  setSessionID,
} from "src/slices/selectedItems/selectedItemsSlice";
import { openComparePanel } from "src/slices/ui/UISlice";
import { RootState } from "../rootReducer";
import { BookmarkPreviewPanel } from "./BookmarkPreviewPanel";
import { BookmarksPanel } from "./BookmarksPanel";

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
