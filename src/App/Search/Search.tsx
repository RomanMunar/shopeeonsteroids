import { Box, Flex, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkItem, RatingQuery, SearchItem, SearchSort, SellerLocation } from "src/lib/types";
import { addBookmarkItem } from "src/slices/bookmarks/bookmarksSlice";
import {
  fetchSearch,
  setPriceMin,
  setPriceMax,
  setKeyword,
  setSort,
  setOrder,
  setLocation,
  setRatingFilter,
  toggleShopeeVerifiedOnly,
  toggleCODOnly,
  incrementPage,
  decrementPage,
} from "src/slices/search/searchSlice";
import {
  fetchDetailedItem,
  fetchItemRatings,
  fetchShopBrief,
  SelectedItem,
  SelectedItemDetailed,
  selectItem,
  swapFirstAndSecondItems,
  unselectItem,
  toFirst,
  toSecond,
  toThird,
} from "src/slices/selectedItems/selectedItemsSlice";
import {
  closeComparePanel as comparePanelClose,
  closeModal as modalClose,
  doubleCompareLayout,
  openComparePanel as comparePanelOpen,
  showBookmarkFormModal,
  toggleFilterPanel,
  tripleCompareLayout,
} from "src/slices/ui/UISlice";
import { RootState } from "../rootReducer";
import { ComparePanel } from "./ComparePanel";
import { FilterPanel } from "./FilterPanel";
import { SearchPanel } from "./SearchPanel";
import { SelectedItemsPanel } from "./SelectedItemsPanel";

const Search = () => {
  const toast = useToast();
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
  const { isEmpty, selectedItems } = useSelector((state: RootState) => state.selectedItemsReducer);
  const closeBookmarkForm = () => dispatch(modalClose());
  const openBookmarkForm = () => dispatch(showBookmarkFormModal());
  const addToBookmarks = (title: string, description: string) => {
    if (!title) {
      toast({
        position: "top",
        description: "Title field is required.",
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
              setPriceMin={(priceMin: number) => dispatch(setPriceMin({ priceMin }))}
              setPriceMax={(priceMax: number) => dispatch(setPriceMax({ priceMax }))}
              setLocation={(location: SellerLocation) => dispatch(setLocation({ location }))}
              setRatingFilter={(star: number) => dispatch(setRatingFilter({ star }))}
              toggleShopeeVerifiedOnly={() => dispatch(toggleShopeeVerifiedOnly())}
              toggleCODOnly={() => dispatch(toggleCODOnly())}
              query={query}
              collapsed={isFilterPanelCollapsed}
              toggleCollapse={toggleFilterPanelCollapse}
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
              setKeyword={(keyword: string) => dispatch(setKeyword({ keyword }))}
              setSort={(by: SearchSort) => dispatch(setSort({ by }))}
              setOrder={(order: "asc" | "desc") => dispatch(setOrder({ order }))}
              incrementPage={() => dispatch(incrementPage())}
              decrementPage={() => dispatch(decrementPage())}
            />
          </Flex>
          <ComparePanel
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
