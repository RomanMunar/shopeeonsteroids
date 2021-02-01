import { Flex } from "@chakra-ui/react";
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
import { setSelectedItems } from "src/slices/selectedItems/selectedItemsSlice";
import { RootState } from "../rootReducer";
import { BookmarksPanel } from "./BookmarksPanel";
import { PreviewPanel } from "./PreviewPanel";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarks, displayedBookmark } = useSelector((state: RootState) => state.bookmarkReducer);
  const updateBookmarkDescription = (item: BookmarkItem, newDescription: string) =>
    dispatch(bookmarkDescriptionUpdate({ item, newDescription }));
  const updateBookmarkTitle = (item: BookmarkItem, newTitle: string) =>
    dispatch(bookmarkTitleUpdate({ item, newTitle }));
  const removeBookmarkItem = (item: BookmarkItem) => dispatch(bookmarkItemRemove({ item }));
  const favoriteBookmark = (item: BookmarkItem) => dispatch(bookmarkFavorite({ item }));
  const unfavoriteBookmark = (item: BookmarkItem) => dispatch(bookmarkUnfavorite({ item }));
  const previewBookmark = (item: BookmarkItem) => dispatch(bookmarkPreview({ item }));
  const compareBookmarkItems = (item: BookmarkItem) => {
    dispatch(setSelectedItems({ items: item.items }));
    dispatch(openComparePanel());
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
        favoriteBookmark={favoriteBookmark}
        unfavoriteBookmark={unfavoriteBookmark}
      />
      <PreviewPanel
        displayedBookmark={displayedBookmark}
        compareBookmarkItems={compareBookmarkItems}
      />
    </Flex>
  );
};

export default Bookmarks;
