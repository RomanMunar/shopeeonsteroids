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
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MotionBox } from "src/components";
import { ArrowRight, Star } from "src/components/icons";
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
  collapseFilter: () => void;
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
  const isMobile = useMediaQuery("(max-width: 500px)")[0];

  return (
    <>
      <MotionBox
        animate={{
          overflow: collapsed ? "hidden" : "auto",
          height: isMobile ? (collapsed ? "50px" : "100vh") : "100vh",
          bottom: isMobile ? (collapsed ? 50 : 0) : 0,
        }}
        // @ts-ignore
        transition={{ type: "tween", duration: 0.2 }}
        bg="white"
        borderRight={isMobile ? (collapsed ? 0 : "1px") : "1px"}
        borderColor="gray.300"
        display="flex"
        position={["absolute", "relative"]}
        flexDirection="row"
        zIndex="90"
        p={5}
        justifyContent="space-between"
        alignItems="start">
        <MotionBox
          animate={{
            width: collapsed ? 0 : "200px",
            visibility: collapsed ? "hidden" : "visible",
            opacity: collapsed ? 0 : 1,
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
                            <Star
                              key={r}
                              width="15px"
                              height="15px"
                              color={r <= rating ? "#3182CE" : "#DADADA"}
                            />
                          ))}{" "}
                          <Text fontSize="sm">&UP</Text>
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
        <MotionBox
          animate={{ rotate: collapsed ? -180 : 0 }}
          border={isMobile ? "2px" : "0"}
          borderColor={isMobile ? "gray.300" : "0"}
          position="absolute"
          top="8px"
          right="8px"
          as="button"
          onClick={toggleCollapse}
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
    </>
  );
};

export default filterPanel;
