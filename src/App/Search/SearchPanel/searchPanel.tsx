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
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Search } from "src/components/icons";
import { ProductCard, ProductSkeleton } from "src/components/product";
import { SearchItem } from "src/lib/types";
import { SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";
import { openComparePanel } from "src/slices/ui/UISlice";

interface Props {
  items: SearchItem[];
  errors: string[];
  fetchStatus: "fulfilled" | "pending" | "idle";
  addToSelectedItems: (item: SearchItem) => void;
  removeToSelectedItems: (selectedItem: any & { itemid: number; shopid: number }) => void;
  selectedItems: (SelectedItem | SelectedItemDetailed)[];
  search: () => void;
}

const searchPanel = ({
  items,
  fetchStatus,
  addToSelectedItems,
  removeToSelectedItems,
  selectedItems,
  search,
}: Props) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const selectedItemsIds = selectedItems.map((i) => i.itemid);

  useEffect(() => {
    search();
    // delay rendering of heavy components
    setTimeout(() => setMounted(true), 400);
  }, []);

  return (
    <Box flex="1" flexGrow={1} position="relative" w="full" h="full" overflowY="auto">
      <Box w="full" borderBottom="1px" borderColor="gray.300">
        <Box maxW="5xl" w="full" m="auto">
          <Flex alignItems="center" justifyContent="space-between">
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
              onClick={() => dispatch(openComparePanel())}>
              Compare Now
            </Button>
          </Flex>
          <Box px={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search width="20" height="20" />
              </InputLeftElement>
              <Input type="text" placeholder="Coffee..." />
            </InputGroup>
            <Flex my="4" w="full" justifyContent="space-between">
              <HStack spacing={3}>
                <Flex alignItems="center">
                  <Text mx="1" whiteSpace="nowrap">
                    Price Range
                  </Text>
                  <Select size="sm" w="auto" placeholder="P0 - P5000">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Flex>
                <Flex alignItems="center">
                  <Text mx="1" whiteSpace="nowrap">
                    Sort By
                  </Text>
                  <Select size="sm" w="auto" placeholder="Sales">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Flex>
              </HStack>
              <Flex alignItems="center">
                <Text mx="1">Page 1/4</Text>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <IconButton
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    }
                  />
                  <IconButton
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
      <Box w="full" shadow="inner" bg="gray.50">
        <Box w="full" maxW="5xl">
          <Flex w="full" top="0" bg="gray.50" alignItems="start" py={2} px={6} position="sticky">
            <Text display="inline-block">Search results for &ldquo;Coffee&rdquo;</Text>
          </Flex>
          <Flex p={2} alignItems="center" flexDirection="row" w="full" flexWrap="wrap">
            {mounted && fetchStatus !== "pending" ? (
              items.map((m) => (
                <ProductCard
                  selected={selectedItemsIds.includes(m.itemid)}
                  addToSelectedItems={addToSelectedItems}
                  removeToSelectedItems={removeToSelectedItems}
                  key={m.itemid}
                  item={m}
                />
              ))
            ) : (
              <>
                {Array(10).map((_, idx) => (
                  <ProductSkeleton key={idx} />
                ))}
              </>
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default searchPanel;
