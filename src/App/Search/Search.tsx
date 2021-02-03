import { Box, Flex, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkItem, RatingQuery, SearchItem, SearchSort, SellerLocation } from "src/lib/types";
import { addLocalStorageBookmark } from "src/lib/utils/localStorage";
import { addBookmarkItem, setSelectedBookmarkedItems } from "src/slices/bookmarks/bookmarksSlice";
import {
  decrementPage as pageDecrement,
  fetchSearch,
  incrementPage as pageIncrement,
  setKeyword as keywordSet,
  setLocation as locationSet,
  setOrder as orderSet,
  setPriceMax,
  setPriceMin,
  setRatingFilter as setFilterRating,
  setSort as sortSet,
  toggleCODOnly as toggleCOD,
  toggleShopeeVerifiedOnly as toggleVerifiedOnly,
} from "src/slices/search/searchSlice";
import {
  fetchDetailedItem,
  fetchItemRatings,
  fetchShopBrief,
  SelectedItem,
  SelectedItemDetailed,
  selectItem,
  swapFirstAndSecondItems,
  toFirst,
  toSecond,
  toThird,
  unselectItem,
} from "src/slices/selectedItems/selectedItemsSlice";
import {
  closeComparePanel as comparePanelClose,
  closeModal as modalClose,
  doubleCompareLayout,
  openComparePanel as comparePanelOpen,
  showBookmarkFormModal,
  toggleFilterPanel,
  tripleCompareLayout,
  collapseFilterPanel,
} from "src/slices/ui/UISlice";
import useClippy from "use-clippy";
import { RootState } from "../rootReducer";
import { ComparePanel } from "./ComparePanel";
import { FilterPanel } from "./FilterPanel";
import { SearchPanel } from "./SearchPanel";
import { SelectedItemsPanel } from "./SelectedItemsPanel";

const Search = () => {
  const toast = useToast();
  const [, setClipboard] = useClippy();
  const dispatch = useDispatch();
  const {
    displayComparePanel,
    compareLayout,
    isFilterPanelCollapsed,
    displayModal,
    modalView,
  } = useSelector((state: RootState) => state.UIReducer);
  const { items, errors, fetchStatus, query } = useSelector(
    (state: RootState) => state.searchReducer
  );
  const { isEmpty, selectedItems, sessionID, isFromBookmarks } = useSelector(
    (state: RootState) => state.selectedItemsReducer
  );
  const closeBookmarkForm = () => dispatch(modalClose());
  const openBookmarkForm = () => dispatch(showBookmarkFormModal());
  const addToBookmarks = (title: string, description: string) => {
    if (!title) {
      toast({
        position: "top",
        description: "Title field is required.",
        isClosable: true,
      });
      return;
    }
    const newBookmark: BookmarkItem = {
      description,
      title,
      favorite: false,
      id: Date.now(),
      items: selectedItems,
    };
    if (selectedItems.length < 2) {
      toast({
        position: "top",
        title: "Add more",
        description: "Must have atleast two items to bookmark.",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    dispatch(addBookmarkItem({ item: newBookmark }));
    toast({
      position: "top",
      status: "success",
      title: "Bookmark added.",
      description: `${title} saved in your bookmarks`,
      isClosable: true,
    });
    dispatch(modalClose());
  };
  const swapFirstAndSecond = () => dispatch(swapFirstAndSecondItems());
  const search = () => dispatch(fetchSearch());
  const toDoubleLayout = () => dispatch(doubleCompareLayout());
  const toTripleLayout = () => {
    if (selectedItems.length < 3) {
      toast({
        position: "top",
        title: "Add more",
        description: "Must have atleast three items to use three-item layout.",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    dispatch(tripleCompareLayout());
  };
  const fetchShop = (item: SelectedItem | SelectedItemDetailed) => dispatch(fetchShopBrief(item));
  const fetchRatings = (ratingQuery: RatingQuery, reset?: boolean) => {
    dispatch(fetchItemRatings({ ratingQuery, reset }));
  };
  const addToSelectedItems = (item: SearchItem) => {
    dispatch(selectItem({ item }));
  };
  const toggleFilterPanelCollapse = () => dispatch(toggleFilterPanel());
  const collapseFilter = () => {
    dispatch(collapseFilter());
  };
  const closeComparePanel = () => {
    dispatch(comparePanelClose());
  };
  const openComparePanel = () => {
    if (selectedItems.length < 2) {
      toast({
        position: "top",
        title: "Add more",
        description: "Must have atleast two items to compare.",
        status: "warning",
        isClosable: true,
      });
    } else {
      toast.closeAll();
      dispatch(comparePanelOpen());
    }
  };
  const fetchItemDetails = (item: SelectedItem | SelectedItemDetailed) => {
    if (item.fetchStatus === "fulfilled") return;

    dispatch(fetchDetailedItem(item));
  };
  const toFirstItem = (item: any & { itemid: number; shopid: number }) => {
    dispatch(toFirst({ item }));
  };
  const toSecondItem = (item: any & { itemid: number; shopid: number }) => {
    dispatch(toSecond({ item }));
  };
  const toThirdItem = (item: any & { itemid: number; shopid: number }) => {
    if (selectedItems.length <= 2) {
      toast({
        position: "top",
        description: "Needs atleast three items",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    dispatch(toThird({ item }));
  };
  const removeToSelectedItems = (selectedItem: any & { itemid: number; shopid: number }) => {
    if (selectedItems.length <= 2) {
      toast({
        position: "top",
        description: "Must have atleast two items.",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    dispatch(unselectItem({ selectedItem }));
  };
  const copyShopeeUrl = (item: any & { itemid: number; shopid: number; name: string }) => {
    setClipboard(
      `https://shopee.ph/${item.name.replace(/\s/gi, "-")}-i.${item.shopid}.${item.itemid}`
    );
    toast({
      position: "top",
      status: "success",
      title: "Successfully copied url to your clipboard",
      isClosable: true,
    });
  };
  const setPriceRange = (priceMin?: number, priceMax?: number) => {
    if (priceMax && priceMin) {
      if (priceMin > priceMax) {
        toast({
          position: "top",
          description: "Mininum Price should be less than the maximum price",
          isClosable: true,
          status: "warning",
        });
        return;
      }
      dispatch(setPriceMin({ priceMin }));
      dispatch(setPriceMax({ priceMax }));
    } else {
      if (priceMin) {
        dispatch(setPriceMin({ priceMin }));
      }
      if (priceMax) {
        dispatch(setPriceMax({ priceMax }));
      }
    }
  };
  const setKeyword = (keyword: string) => {
    if (keyword === "") {
      return;
    }
    dispatch(keywordSet({ keyword }));
  };
  const setLocation = (location: SellerLocation) => dispatch(locationSet({ location }));
  const setRatingFilter = (star: number) => dispatch(setFilterRating({ star }));
  const toggleShopeeVerifiedOnly = () => dispatch(toggleVerifiedOnly());
  const toggleCODOnly = () => dispatch(toggleCOD());
  const setSort = (by: SearchSort) => dispatch(sortSet({ by }));
  const setOrder = (order: "asc" | "desc") => dispatch(orderSet({ order }));
  const incrementPage = () => dispatch(pageIncrement());
  const decrementPage = () => {
    if (query.newest <= 0) return;
    dispatch(pageDecrement());
  };
  useEffect(() => console.log({ query }), [query]);
  useEffect(() => {
    if (isFromBookmarks) {
      // Sync items if items are from a bookmark
      dispatch(setSelectedBookmarkedItems({ id: sessionID, newItems: selectedItems }));
    } else {
      if (selectedItems.length <= 2) return;
      const date = new Date();
      const sessionBookmark = {
        title: `Unsaved Session`,
        description: `Session from \`${date.toDateString()}\``,
        id: sessionID,
        items: selectedItems,
        favorite: false,
      };
      addLocalStorageBookmark(sessionBookmark);
    }
  }, [selectedItems]);

  return (
    <Flex overflowY="hidden" h="100vh" w="full" flexDirection="row">
      <Box
        position="relative"
        flexGrow={1}
        boxShadow="inner"
        borderX="1px"
        overflow="hidden"
        borderColor="gray.300"
        h="100vh">
        <Box w="full" h="100vh">
          <Flex w="full" position="relative" flexDirection="row" overflowY="hidden" h="100vh">
            <FilterPanel
              setPriceRange={setPriceRange}
              setLocation={setLocation}
              setRatingFilter={setRatingFilter}
              toggleShopeeVerifiedOnly={toggleShopeeVerifiedOnly}
              toggleCODOnly={toggleCODOnly}
              query={query}
              collapsed={isFilterPanelCollapsed}
              toggleCollapse={toggleFilterPanelCollapse}
              collapseFilter={collapseFilter}
            />
            <SearchPanel
              openComparePanel={openComparePanel}
              selectedItems={selectedItems}
              removeToSelectedItems={removeToSelectedItems}
              addToSelectedItems={addToSelectedItems}
              errors={errors}
              fetchStatus={fetchStatus}
              items={items}
              search={search}
              query={query}
              setKeyword={setKeyword}
              setSort={setSort}
              setOrder={setOrder}
              incrementPage={incrementPage}
              decrementPage={decrementPage}
            />
          </Flex>
          <ComparePanel
            copyShopeeUrl={copyShopeeUrl}
            closePanel={closeComparePanel}
            fetchShop={fetchShop}
            fetchRatings={fetchRatings}
            display={displayComparePanel}
            fetchItemDetails={fetchItemDetails}
            layout={compareLayout}
            selectedItems={selectedItems}
            swapFirstAndSecond={swapFirstAndSecond}
            toDoubleLayout={toDoubleLayout}
            toTripleLayout={toTripleLayout}
          />
        </Box>
      </Box>
      <SelectedItemsPanel
        displayComparePanel={displayComparePanel}
        toFirstItem={toFirstItem}
        toSecondItem={toSecondItem}
        toThirdItem={toThirdItem}
        addToBookmarks={addToBookmarks}
        openBookmarkForm={openBookmarkForm}
        displayBookmarkForm={displayModal && modalView === "bookmarkForm"}
        selectedItems={selectedItems}
        closeBookmarkForm={closeBookmarkForm}
        removeToSelectedItems={removeToSelectedItems}
        isEmpty={isEmpty}
        compareLayout={compareLayout}
      />
    </Flex>
  );
};

export default Search;
