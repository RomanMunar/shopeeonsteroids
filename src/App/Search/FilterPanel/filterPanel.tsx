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
import { MotionBox } from "src/components";

interface Props {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const filterPanel = ({ collapsed, toggleCollapse }: Props) => {
  return (
    <Box borderRight="1px" borderColor="gray.300" position="relative" flex="none">
      <MotionBox
        animate={{
          opacity: collapsed ? 0 : 1,
          overflow: collapsed ? "hidden" : "auto",
        }}
        // @ts-ignore
        transition={{ type: "spring", duration: 0.2, delay: 0.1 }}
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
          transition={{ type: "spring", duration: 0.2 }}>
          <Heading as="h3" size="sm">
            FILTER
          </Heading>
          <Box>
            <VStack my="4" display="flex" flexDirection="column" spacing="20px">
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
