import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "src/components";
import { fetchSearch } from "src/slices/search/searchSlice";
import { RootState } from "../rootReducer";
import { FilterPanel } from "./FilterPanel";
import { SearchPanel } from "./SearchPanel";
import { SelectedItemsPanel } from "./SelectedItemsPanel";

const Search = () => {
  const items = useSelector((state: RootState) => state.searchReducer.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearch());
  }, []);

  return (
    <Flex overflowY="hidden" h="100vh" w="full" flexDirection="row">
      <FilterPanel />
      <SearchPanel />
      <SelectedItemsPanel />
    </Flex>
  );
};

Search.Layout = Layout;

export default Search;
