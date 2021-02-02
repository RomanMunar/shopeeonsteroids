import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Search } from "src/components/icons";
import { ProductCard, ProductSkeleton } from "src/components/product";
import { searchItemLimitPerPage, searchSort } from "src/lib/data/constants";
import { SearchItem, SearchQuery, SearchSort } from "src/lib/types";
import { SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";

interface Props {
  items: SearchItem[];
  errors: string[];
  fetchStatus: "fulfilled" | "pending" | "idle";
  selectedItems: (SelectedItem | SelectedItemDetailed)[];
  query: SearchQuery;
  addToSelectedItems: (item: SearchItem) => void;
  removeToSelectedItems: (selectedItem: any & { itemid: number; shopid: number }) => void;
  search: () => void;
  decrementPage: () => void;
  openComparePanel: () => void;
  incrementPage: () => void;
  setKeyword: (keyword: string) => void;
  setSort: (by: SearchSort) => void;
  setOrder: (order: "asc" | "desc") => void;
}

const searchPanel = ({
  items,
  fetchStatus,
  addToSelectedItems,
  removeToSelectedItems,
  selectedItems,
  search,
  openComparePanel,
  query,
  setSort,
  setKeyword,
  incrementPage,
  decrementPage,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  const selectedItemsIds = selectedItems.map((i) => i.itemid);
  const [localKeyword, setLocalKeyword] = useState("");
  useEffect(() => {
    // delay rendering of heavy components
    setTimeout(() => setMounted(true), 400);
  }, []);

  const onKeypressSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query.keyword === localKeyword) return;

    if (event.code === "Enter" || event.code === "NumpadEnter") {
      setKeyword(localKeyword);
      search();
    }
  };

  return (
    <Flex
      flexDirection="column"
      flex="1"
      flexGrow={1}
      position="relative"
      w="full"
      h="full"
      overflowY="auto">
      <Box w="full" borderBottom="1px" borderColor="gray.300">
        <Box maxW="5xl" w="full" m="auto">
          <Flex zIndex="20" alignItems="center" justifyContent="space-between">
            <Heading as="h3" p="4" size="sm" alignSelf="start">
              SEARCH
            </Heading>
            <Button
              rightIcon={
                <svg
                  fill="currentColor"
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 20"
                  transform="rotate(180)"
                  x="0px"
                  y="0px">
                  <g>
                    <path d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"></path>
                  </g>
                </svg>
              }
              mr="2"
              size="sm"
              colorScheme="blue"
              onClick={openComparePanel}>
              Compare Now
            </Button>
          </Flex>
          <Box px={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search width="20" height="20" />
              </InputLeftElement>
              <Input
                value={localKeyword}
                onChange={(e) => setLocalKeyword(e.target.value)}
                onKeyPress={onKeypressSubmit}
                type="text"
                placeholder="Coffee..."
              />
            </InputGroup>
            <Flex my="4" w="full" justifyContent="space-between">
              <HStack spacing={3}>
                <Flex alignItems="center">
                  <Text mx="1" whiteSpace="nowrap">
                    Sort By
                  </Text>
                  <ButtonGroup size="sm" variant="outline">
                    {searchSort.map((s) => (
                      <Button
                        key={s}
                        mx="0.5"
                        textTransform="capitalize"
                        color={query.by === s ? "blue.500" : "gray.800"}
                        onClick={() => setSort(s)}>
                        {s}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Flex>
              </HStack>
              <Flex alignItems="center">
                <Text mx="1">Page {query.newest / searchItemLimitPerPage}</Text>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <IconButton
                    onClick={decrementPage}
                    p={2}
                    aria-label="Previous Page"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    }
                  />
                  <IconButton
                    onClick={incrementPage}
                    p={2}
                    aria-label="Add to friends"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    }
                  />
                </ButtonGroup>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Box w="full" shadow="inner" bg="gray.50" flex="1">
        <Box postion="relative" w="full" maxW="5xl">
          {mounted && query.keyword !== "" && (
            <Flex w="full" bg="gray.50" alignItems="start" py={2} px={6} zIndex="20">
              Search results for &ldquo;{query.keyword}&rdquo;
            </Flex>
          )}
          {mounted && fetchStatus === "idle" && (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" my="10">
              <Heading mb="-10" size="md">
                Try to Search for `Coffee`
              </Heading>
              <Box as="img" w="auto" h="400px" src="/gummy-coffee.png" alt="coffee cup" />
            </Flex>
          )}
          <Flex p={2} alignItems="center" flexDirection="row" w="full" flexWrap="wrap">
            {mounted &&
              fetchStatus === "pending" &&
              new Array(12).fill(0).map(() => (
                <>
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                </>
              ))}
            {mounted &&
              fetchStatus === "fulfilled" &&
              items.map((m) => (
                <ProductCard
                  selected={selectedItemsIds.includes(m.itemid)}
                  addToSelectedItems={addToSelectedItems}
                  removeToSelectedItems={removeToSelectedItems}
                  key={m.itemid}
                  item={m}
                />
              ))}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default searchPanel;
