import { Box, Button, Flex, Heading, Skeleton, StackDivider, Text, VStack } from "@chakra-ui/react";
import { SelectedItemCard } from "src/components/product";
import { SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";

interface Props {
  selectedItems: (SelectedItem | SelectedItemDetailed)[];
  isEmpty: boolean;
  removeToSelectedItems: (selectedItem: any & { itemid: number; shopid: number }) => void;
}

const selectedItemsPanel = ({ selectedItems, removeToSelectedItems }: Props) => {
  const selectedItemsLength = selectedItems.length;

  return (
    <Box flex="none" h="100vh" w="300px" overflowY="auto">
      <Box pb={3}>
        <Heading as="h3" size="sm" p={4} alignSelf="start">
          SELECTED ITEMS
        </Heading>
        <Flex alignItems="center" justifyContent="space-between" px={4}>
          <Text>{selectedItemsLength} items</Text>
          <Flex alignItems="center">
            <Button
              size="sm"
              whiteSpace="nowrap"
              leftIcon={
                <svg
                  width="20px"
                  height="20px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }>
              Bookmark Items
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box borderY="1px" borderColor="gray.200" bg="gray.50" h="full" w="full">
        <VStack
          borderY="1px"
          borderColor="gray.200"
          w="full"
          shadow="inner"
          flexGrow={1}
          flexDirection="column"
          flexWrap="wrap"
          display="flex"
          spacing="0px"
          divider={<StackDivider borderColor="gray.300" />}>
          {selectedItemsLength < 1 ? (
            <Heading my="10" size="md">
              Empty
            </Heading>
          ) : (
            selectedItems.map((item) =>
              item.fetchStatus !== "pending" ? (
                <SelectedItemCard
                  removeToSelectedItems={removeToSelectedItems}
                  item={item}
                  key={item.itemid}
                />
              ) : (
                <Box p="4" w="100%">
                  <Skeleton rounded="md" w="100%" h="100px" />
                </Box>
              )
            )
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default selectedItemsPanel;
