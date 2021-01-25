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
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
// interface Props {
//   setQuery: () => void;
// }

const filterPanel = () => {
  return (
    <Box overflowY="auto" h="100vh" w="220px" borderColor="blue.300" flex="none">
      <Heading as="h3" size="sm" p={4}>
        FILTER
      </Heading>
      <VStack display="flex" px={4} flexDirection="column" spacing="20px">
        <FormControl id="price">
          <FormLabel>Shipped From</FormLabel>
          <Flex flexDirection="column" alignItems="start" justifyContent="space-between">
            <Checkbox iconSize="1rem">Metro Manila</Checkbox>
            <Checkbox iconSize="1rem">South Luzon</Checkbox>
            <Checkbox iconSize="1rem">Mindanao</Checkbox>
            <Checkbox iconSize="1rem">Visayas</Checkbox>
            <Checkbox iconSize="1rem">All</Checkbox>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>Rating</FormLabel>
          <Slider max={5} aria-label="slider-ex-1" defaultValue={3}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb border="2px" p="8px" borderColor="blue.400" />
          </Slider>
        </FormControl>
        <FormControl id="price">
          <FormLabel>Price range</FormLabel>
          <Flex alignItems="center" justifyContent="space-between">
            <NumberInput size="sm">
              <NumberInputField placeholder="Min" w="85px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Divider mx={1} />
            <NumberInput size="sm">
              <NumberInputField placeholder="Max" w="85px" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Button w="full" mt={2} colorScheme="blue" variant="outline">
            Apply
          </Button>
        </FormControl>
        <FormControl id="price">
          <FormLabel>Shop Options</FormLabel>
          <Flex flexDirection="column" alignItems="start" justifyContent="space-between">
            <Checkbox iconSize="1rem">Preffered Only</Checkbox>
            <Checkbox iconSize="1rem">Active Last 3 days</Checkbox>
            <Checkbox iconSize="1rem">COD Only</Checkbox>
          </Flex>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default filterPanel;
