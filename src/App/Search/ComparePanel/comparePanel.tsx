import { Box, Button, ButtonGroup, Flex, Heading, IconButton, useToast } from "@chakra-ui/react";
import { MotionBox } from "src/components";
import { CompareProductCard } from "src/components/product";
import { RatingQuery } from "src/lib/types";
import { CompareLayout, SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";

interface Props {
  selectedItems: (SelectedItem | SelectedItemDetailed)[];
  layout: CompareLayout;
  display: boolean;
  fetchItemDetails: (item: SelectedItem | SelectedItemDetailed) => void;
  fetchShop: (item: SelectedItem | SelectedItemDetailed) => void;
  fetchRatings: (ratingQuery: RatingQuery) => void;
  closePanel: () => void;
  swapFirstAndSecond: () => void;
  toDoubleLayout: () => void;
  toTripleLayout: () => void;
}

const comparePanel = ({
  display,
  selectedItems,
  fetchItemDetails,
  closePanel,
  fetchShop,
  fetchRatings,
  swapFirstAndSecond,
  toDoubleLayout,
  toTripleLayout,
  layout,
}: Props) => {
  const atleast3ItemsWarning = () =>
    useToast({
      position: "top",
      title: "Add more",
      description: "Must have atleast three items to use three-item layout.",
      status: "warning",
      duration: 4000,
      isClosable: true,
    });

  return (
    <MotionBox
      animate={{ y: display ? "calc(-100% - 2px)" : 0 }}
      borderTop="2px"
      borderColor="gray.400"
      transitionDuration="0.2s"
      w="full"
      top="100%"
      left="0"
      position="absolute"
      h="full"
      zIndex="20"
      bg="white"
      overflowY="hidden">
      <Flex flexDirection="column" position="relative" h="full">
        <Box w="full" borderBottom="1px" borderColor="gray.300">
          <Box maxW="5xl" w="full" m="auto">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h3" p="4" size="sm" alignSelf="start">
                COMPARE
              </Heading>
              <ButtonGroup size="sm" isAttached>
                <IconButton
                  onClick={toDoubleLayout}
                  aria-label="double item layout"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <rect x="8" y="4" width="6" height="16" rx="2" />
                      <rect x="14" y="4" width="6" height="16" rx="2" />
                    </svg>
                  }
                />
                <IconButton
                  onClick={swapFirstAndSecond}
                  aria-label="swap first and second items"
                  icon={
                    <svg height="20px" width="20px" viewBox="0 0 24 24">
                      <path d="M4,9H17l-1.6,1.2a1,1,0,0,0-.2,1.4,1,1,0,0,0,.8.4,1,1,0,0,0,.6-.2l4-3a1,1,0,0,0,0-1.59l-3.86-3a1,1,0,0,0-1.23,1.58L17.08,7H4A1,1,0,0,0,4,9Z" />
                      <path d="M20,16H7l1.6-1.2a1,1,0,0,0-1.2-1.6l-4,3a1,1,0,0,0,0,1.59l3.86,3a1,1,0,0,0,.61.21,1,1,0,0,0,.79-.39,1,1,0,0,0-.17-1.4L6.92,18H20a1,1,0,0,0,0-2Z" />
                    </svg>
                  }
                />
                <IconButton
                  onClick={selectedItems.length <= 2 ? atleast3ItemsWarning : toTripleLayout}
                  aria-label="triple item layout"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <rect x="4" y="4" width="6" height="16" rx="2" />
                      <rect x="10" y="4" width="6" height="16" rx="2" />
                      <rect x="16" y="4" width="6" height="16" rx="2" />
                    </svg>
                  }
                />
              </ButtonGroup>
              <Button
                leftIcon={
                  <svg
                    fill="currentColor"
                    width="20px"
                    height="20px"
                    viewBox="0 0 20 20"
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
                onClick={closePanel}>
                Back To Search
              </Button>
            </Flex>
          </Box>
        </Box>
        <Box w="full" flexGrow={1} shadow="inner" bg="gray.50" h="full">
          <Box w="full" maxW="5xl" m="auto">
            <Flex justifyContent="center" overflow="hidden" h="85vh" m={5}>
              {selectedItems.slice(0, layout === "double" ? 2 : 3).map((si) => (
                <CompareProductCard
                  fetchShop={fetchShop}
                  fetchRatings={fetchRatings}
                  fetchItemDetails={fetchItemDetails}
                  key={si.itemid}
                  selectedItem={si}
                />
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default comparePanel;
