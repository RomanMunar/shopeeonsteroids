import {
  Flex,
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { Search } from "src/components/icons";

const leftPanel = () => {
  return (
    <Flex
      flexDirection="column"
      overflowY="auto"
      h="100vh"
      w="300px"
      borderRight="1px"
      borderColor="gray.300"
      flex="none">
      <Heading as="h3" size="sm" px="2" py="4" alignSelf="start">
        BOOKMARKS
      </Heading>
      <Box my="4" px="2">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search width="20" height="20" />
          </InputLeftElement>
          <Input type="text" placeholder="Coffee..." />
        </InputGroup>
      </Box>
      <Box bg="gray.50" display="flex" alignItems="start" flex="1" shadow="inner">
        <VStack
          borderY="1px"
          borderColor="gray.200"
          spacing="0px"
          w="full"
          divider={<StackDivider borderColor="gray.300" />}>
          <Box bg="blue.50" w="full" px="4" py="2">
            <Text my="1" isTruncated fontSize="md" color="gray.800">
              CoffeeCoffee to testCoffee to test to test
            </Text>
            <Text noOfLines={2} fontSize="xs" fontWeight="600" color="gray.600">
              Grounds I to test in the future Grounds I to test in the future Grounds I to test in
              the future
            </Text>
          </Box>
          <Box bg="white" w="full" px="4" py="2">
            <Text fontSize="md" color="gray.800">
              Coffee to test
            </Text>
            <Text fontSize="xs" fontWeight="600" color="gray.600">
              Grounds I to test in the future
            </Text>
          </Box>
          <Box bg="white" w="full" px="4" py="2" pb="4">
            <Text fontSize="md" color="gray.800">
              Coffee to test
            </Text>
            <Text fontSize="xs" fontWeight="600" color="gray.600">
              Grounds I to test in the future
            </Text>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default leftPanel;
