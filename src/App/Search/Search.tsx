import { Box, Flex, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RatingQuery, SearchItem } from "src/lib/types";
import { fetchSearch } from "src/slices/search/searchSlice";
import {
  fetchDetailedItem,
  fetchShopBrief,
  fetchItemRatings,
  SelectedItem,
  SelectedItemDetailed,
  selectItem,
  unselectItem,
  swapFirstAndSecondItems,
} from "src/slices/selectedItems/selectedItemsSlice";
import {
  closeComparePanel as comparePanelClose,
  doubleCompareLayout,
  openComparePanel as comparePanelOpen,
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
  const { displayComparePanel, compareLayout, isFilterPanelCollapsed } = useSelector(
    (state: RootState) => state.UIReducer
  );
  const { items, errors, fetchStatus } = useSelector((state: RootState) => state.searchReducer);
  const { isEmpty, selectedItems } = useSelector((state: RootState) => state.selectedItemsReducer);

  const search = () => dispatch(fetchSearch());
  const swapFirstAndSecond = () => dispatch(swapFirstAndSecondItems());
  const toDoubleLayout = () => dispatch(doubleCompareLayout());
  const toTripleLayout = () => dispatch(tripleCompareLayout());
  const fetchShop = (item: SelectedItem | SelectedItemDetailed) => dispatch(fetchShopBrief(item));
  const fetchRatings = (ratingQuery: RatingQuery) => dispatch(fetchItemRatings(ratingQuery));

  const addToSelectedItems = (item: SearchItem) => dispatch(selectItem({ item }));
  const toggleFilterPanelCollapse = () => dispatch(toggleFilterPanel());
  const closeComparePanel = () => dispatch(comparePanelClose());
  const openComparePanel = () => {
    if (selectedItems.length < 2) {
      toast({
        position: "top",
        title: "Add more",
        description: "Must have atleast two items to compare.",
        status: "warning",
        duration: 4000,
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

  const removeToSelectedItems = (selectedItem: any & { itemid: number; shopid: number }) =>
    dispatch(unselectItem({ selectedItem }));

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
        removeToSelectedItems={removeToSelectedItems}
        isEmpty={isEmpty}
        selectedItems={selectedItems}
      />
    </Flex>
  );
};

export default Search;
