import { Box, Button, Flex, Heading, Skeleton, StackDivider, Text, VStack } from "@chakra-ui/react";
import { BookmarkFormView } from "src/components";
import { SelectedItemCard } from "src/components/product";
import { CompareLayout, SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";

interface Props {
  selectedItems: (SelectedItem | SelectedItemDetailed)[];
  isEmpty: boolean;
  displayBookmarkForm: boolean;
  displayComparePanel: boolean;
  compareLayout: CompareLayout;
  closeBookmarkForm: () => void;
  openBookmarkForm: () => void;
  removeToSelectedItems: (selectedItem: any & { itemid: number; shopid: number }) => void;
  addToBookmarks: (title: string, description: string) => void;
  toFirstItem: (item: any & { itemid: number; shopid: number }) => void;
  toSecondItem: (item: any & { itemid: number; shopid: number }) => void;
  toThirdItem: (item: any & { itemid: number; shopid: number }) => void;
}

const selectedItemsPanel = ({
  selectedItems,
  displayComparePanel,
  removeToSelectedItems,
  displayBookmarkForm,
  closeBookmarkForm,
  openBookmarkForm,
  addToBookmarks,
  toFirstItem,
  toSecondItem,
  toThirdItem,
  compareLayout,
}: Props) => {
  return (
    <>
      <Flex flexDirection="column" flex="none" h="100vh" w="300px" overflowY="auto">
        <Box pb={3}>
          <Heading as="h3" size="sm" p={4} alignSelf="start">
            SELECTED ITEMS
          </Heading>
          <Flex alignItems="center" justifyContent="space-between" px={4}>
            <Text>{selectedItems.length} items</Text>
            <Flex alignItems="center">
              <Button
                onClick={openBookmarkForm}
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
        <Box flex="1" borderY="1px" borderColor="gray.200" bg="gray.50" w="full">
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
            {selectedItems.length < 1 ? (
              <Heading my="10" size="md">
                Empty
              </Heading>
            ) : (
              selectedItems.map((item) =>
                item.fetchStatus !== "pending" ? (
                  <SelectedItemCard
                    removeToSelectedItems={removeToSelectedItems}
                    toFirstItem={displayComparePanel ? toFirstItem : undefined}
                    toSecondItem={
                      displayComparePanel && selectedItems.length >= 2 ? toSecondItem : undefined
                    }
                    toThirdItem={
                      displayComparePanel && compareLayout === "triple" ? toThirdItem : undefined
                    }
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
      </Flex>
      <BookmarkFormView
        selectedItems={selectedItems}
        isOpen={displayBookmarkForm}
        onClose={closeBookmarkForm}
        addToBookmarks={addToBookmarks}
      />
    </>
  );
};

export default selectedItemsPanel;
