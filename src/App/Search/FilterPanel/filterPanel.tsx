import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MotionBox } from "src/components";
import { itemRating, locations } from "src/lib/data/constants";
import { SearchQuery, SellerLocation } from "src/lib/types";

interface Props {
  collapsed: boolean;
  query: SearchQuery;
  toggleCollapse: () => void;
  setPriceRange: (priceMin?: number, priceMax?: number) => void;
  setLocation: (location: SellerLocation) => void;
  setRatingFilter: (star: number) => void;
  toggleCODOnly: () => void;
  toggleShopeeVerifiedOnly: () => void;
}

const filterPanel = ({
  collapsed,
  query,
  toggleCollapse,
  setLocation,
  setRatingFilter,
  setPriceRange,
  toggleShopeeVerifiedOnly,
  toggleCODOnly,
}: Props) => {
  const [[minPrice, maxPrice], setPrice] = useState([query.min_price, query.max_price]);
  const onPriceRangeSubmit = () => {
    setPriceRange(minPrice, maxPrice);
  };
  return (
    <Box borderRight="1px" borderColor="gray.300" position="relative" flex="none">
      <MotionBox
        animate={{
          opacity: collapsed ? 0 : 1,
          overflow: collapsed ? "hidden" : "auto",
        }}
        // @ts-ignore
        transition={{ type: "tween", duration: 0.2 }}
        display="flex"
        flexDirection="row"
        p="5"
        w="full"
        justifyContent="space-between"
        alignItems="start">
        <MotionBox
          animate={{
            width: collapsed ? 0 : "auto",
            visibility: collapsed ? "hidden" : "visible",
          }}
          // @ts-ignore
          transition={{ type: "tween", duration: 0.2 }}>
          <Heading as="h3" size="sm">
            FILTER
          </Heading>
          <Box>
            <VStack my="4" display="flex" flexDirection="column" spacing="20px">
              <FormControl id="price">
                <FormLabel>Shipped From</FormLabel>
                <Flex flexDirection="column" alignItems="start" justifyContent="space-between">
                  {locations.map((l) => (
                    <Checkbox
                      key={l}
                      isChecked={query.locations.includes(l)}
                      onChange={() => setLocation(l)}>
                      {l}
                    </Checkbox>
                  ))}
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Flex
                  flexDirection="column-reverse"
                  mx="auto"
                  mb="4"
                  w="full"
                  alignItems="center"
                  maxW="sm">
                  {itemRating.map((rating, idx) => (
                    <Flex key={idx} alignItems="center" justifyContent="start" w="full">
                      <Checkbox
                        key={rating}
                        isChecked={query.rating_filter === rating}
                        onChange={() => setRatingFilter(rating)}>
                        <Flex alignItems="center" flexDirection="row">
                          {rating}
                          {[1, 2, 3, 4, 5].map((r) => (
                            <svg
                              key={r}
                              width="15px"
                              height="15px"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill={r <= rating ? "#3182CE" : "#DADADA"}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}{" "}
                          <Text size="xs">&UP</Text>
                        </Flex>
                      </Checkbox>
                    </Flex>
                  ))}
                </Flex>
              </FormControl>
              <FormControl id="price">
                <FormLabel>Price range</FormLabel>
                <Flex alignItems="center" justifyContent="space-between">
                  <NumberInput
                    size="sm"
                    value={query.min_price}
                    onChange={(e) => setPrice([parseInt(e), maxPrice])}>
                    <NumberInputField placeholder="Min" w="85px" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Divider mx={1} />
                  <NumberInput
                    size="sm"
                    value={query.max_price}
                    onChange={(e) => setPrice([minPrice, parseInt(e)])}>
                    <NumberInputField placeholder="Max" w="85px" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
                <Button
                  onClick={onPriceRangeSubmit}
                  w="full"
                  mt={2}
                  colorScheme="blue"
                  variant="outline">
                  Apply
                </Button>
              </FormControl>
              <FormControl>
                <FormLabel>Shop Options</FormLabel>
                <Flex flexDirection="column" alignItems="start" justifyContent="space-between">
                  <Checkbox
                    onChange={toggleShopeeVerifiedOnly}
                    isChecked={query.shopee_verified === 0 ? false : true}>
                    Verified Sellers Only
                  </Checkbox>
                  <Checkbox onChange={toggleCODOnly} isChecked={query.pay_cod === 0 ? false : true}>
                    COD Only
                  </Checkbox>
                  <Checkbox iconSize="1rem">Active Last 3 days</Checkbox>
                </Flex>
              </FormControl>
            </VStack>
          </Box>
        </MotionBox>
      </MotionBox>
      <MotionBox
        animate={{ rotate: collapsed ? -180 : 0 }}
        position="absolute"
        top="16px"
        right="8px"
        as="button"
        onClick={toggleCollapse}
        minW="20px"
        minH="20px"
        maxW="20px"
        maxH="20px">
        <svg width="100%" height="100%" viewBox="0 0 20 20" x="0px" y="0px">
          <g>
            <path d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"></path>
          </g>
        </svg>
      </MotionBox>
    </Box>
  );
};

export default filterPanel;
