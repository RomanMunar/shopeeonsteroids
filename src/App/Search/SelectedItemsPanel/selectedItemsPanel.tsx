import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  StackDivider,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { BookmarkFormView, MotionBox } from "src/components";
import { ArrowRight, Bookmark } from "src/components/icons";
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
  toggleSelectedItemsPanelCollapse: () => void;
  isSelectedItemsPanelCollapsed: boolean;
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
  toggleSelectedItemsPanelCollapse,
  isSelectedItemsPanelCollapsed,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 500px)")[0];
  return (
    <>
      <MotionBox
        animate={{
          width: isSelectedItemsPanelCollapsed ? 0 : isMobile ? "250px" : "350px",
          height: isMobile ? (isSelectedItemsPanelCollapsed ? "50px" : "100vh") : "100vh",
          bottom: isMobile ? (isSelectedItemsPanelCollapsed ? 50 : 0) : 0,
        }}
        bg="white"
        right={0}
        // @ts-ignore
        transition={{ type: "tween", duration: 0.2 }}
        zIndex="90"
        borderLeft={!isSelectedItemsPanelCollapsed && isMobile ? "1px" : 0}
        borderColor="gray.300"
        p={isSelectedItemsPanelCollapsed ? 5 : 0}
        //@ts-ignore
        position={isMobile ? "absolute" : "relative"}
        overflowY={isSelectedItemsPanelCollapsed ? "hidden" : "auto"}>
        <MotionBox
          animate={{
            visibility: isSelectedItemsPanelCollapsed ? "hidden" : "visible",
            opacity: isSelectedItemsPanelCollapsed ? 0 : 1,
          }}
          display={isSelectedItemsPanelCollapsed ? "none" : "flex"}
          flexDirection="column">
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
                  leftIcon={<Bookmark width="20px" height="20px" />}>
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
                selectedItems.map((item, idx) =>
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
                      key={`${item.itemid}-${idx}`}
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
        </MotionBox>
        <MotionBox
          animate={{ rotate: isSelectedItemsPanelCollapsed ? 0 : -180 }}
          border={isMobile ? "2px" : "0"}
          borderColor={isMobile ? "gray.300" : "0"}
          position="absolute"
          top="8px"
          right="8px"
          as="button"
          onClick={toggleSelectedItemsPanelCollapse}
          alignItems="center"
          justifyContent="center"
          display="flex"
          rounded="md"
          minW="30px"
          minH="30px"
          maxW="30px"
          maxH="30px">
          <ArrowRight width="20px" height="20px" />
        </MotionBox>
      </MotionBox>
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
