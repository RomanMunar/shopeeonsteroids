import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import { MotionBox } from "src/components";
import { ArrowNext, DoubleRectangle, Swap, TripleRectangle } from "src/components/icons";
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
  fetchRatings: (ratingQuery: RatingQuery, reset?: boolean) => void;
  closePanel: () => void;
  swapFirstAndSecond: () => void;
  toDoubleLayout: () => void;
  toTripleLayout: () => void;
  copyShopeeUrl: (item: any & { itemid: number; shopid: number; name: string }) => void;
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
  copyShopeeUrl,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 500px)")[0];
  return (
    <MotionBox
      animate={{ y: display ? "calc(-100% - 2px)" : 0 }}
      borderTop="2px"
      borderColor="gray.400"
      w="full"
      top="100%"
      left="0"
      position="absolute"
      h="full"
      zIndex="10"
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
                <Tooltip label="Double item layout">
                  <IconButton
                    onClick={toDoubleLayout}
                    aria-label="double item layout"
                    icon={<DoubleRectangle />}
                  />
                </Tooltip>
                <Tooltip label="Swap first and second item">
                  <IconButton
                    onClick={swapFirstAndSecond}
                    aria-label="swap first and second items"
                    icon={<Swap height="20px" width="20px" />}
                  />
                </Tooltip>
                <Tooltip label="Triple item layout">
                  <IconButton
                    onClick={toTripleLayout}
                    aria-label="triple item layout"
                    icon={<TripleRectangle />}
                  />
                </Tooltip>
              </ButtonGroup>
              <Button
                leftIcon={<ArrowNext width="20px" height="20px" />}
                mr="2"
                size="sm"
                colorScheme="blue"
                onClick={closePanel}>
                {isMobile ? "Search" : "Back To Search"}
              </Button>
            </Flex>
          </Box>
        </Box>
        <Box w="full" flexGrow={1} shadow="inner" bg="gray.50" h="full">
          <Box w="full" maxW="5xl" m="auto">
            <Flex justifyContent="center" overflow="hidden" h="85vh" m={isMobile ? 0 : 5}>
              {selectedItems.slice(0, layout === "double" ? 2 : 3).map((si) => (
                <CompareProductCard
                  copyShopeeUrl={copyShopeeUrl}
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
