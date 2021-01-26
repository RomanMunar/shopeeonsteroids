import {
  Box,
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
  VStack,
} from "@chakra-ui/react";
import { Search } from "src/components/icons";
import { Item } from "src/lib/types";

interface Props {
  items: Item[];
}

const searchPanel = () => {
  return (
    <Box
      flexGrow={1}
      w="full"
      h="100vh"
      boxShadow="inner"
      overflowY="auto"
      borderX="1px"
      borderColor="gray.300">
      <Box w="full" borderBottom="1px" borderColor="gray.300" p={4}>
        <Box maxW="5xl" w="full" m="auto">
          <Heading as="h3" size="sm" alignSelf="start">
            SEARCH
          </Heading>
          <InputGroup my="3">
            <InputLeftElement pointerEvents="none">
              <Search width="20" height="20" />
            </InputLeftElement>
            <Input type="text" placeholder="Coffee..." />
          </InputGroup>
          <Flex my="3" w="full" justifyContent="space-between">
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
      <Box w="full" shadow="inner" bg="gray.50" h="full">
        <Box w="full" maxW="5xl" m="auto">
          <Flex w="full" top="0" bg="gray.50" alignItems="start" py={2} px={6} position="sticky">
            <Text display="inline-block">Search results for &ldquo;Coffee&rdquo;</Text>
          </Flex>
          <VStack overflowY="hidden" display="flex" p={4} flexDirection="column">
            <Flex overflowY="auto" flexGrow={1} flexDirection="row" w="full" flexWrap="wrap">
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
              <Box
                bg="white"
                h="200px"
                w="160px"
                p={5}
                m={2}
                border="2px"
                rounded="md"
                borderColor="blue.500"
              />
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default searchPanel;
