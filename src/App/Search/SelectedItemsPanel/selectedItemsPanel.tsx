import { Box, Flex, Heading, Select, Text, VStack } from "@chakra-ui/react";

const selectedItemsPanel = () => {
  return (
    <Box flex="none" h="100vh" w="300px" overflowY="auto">
      <Box borderBottom="1px" pb={3} borderColor="gray.300">
        <Heading as="h3" size="sm" p={4} alignSelf="start">
          SELECTED ITEMS
        </Heading>
        <Flex alignItems="center" justifyContent="space-between" px={4}>
          <Text>5 items</Text>
          <Flex alignItems="center">
            <Text whiteSpace="nowrap">Sort by</Text>
            <Select w="auto" size="sm" placeholder="Time">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </Flex>
      </Box>
      <VStack
        shadow="inner"
        flexGrow={1}
        flexDirection="column"
        w="full"
        flexWrap="wrap"
        display="flex"
        p={4}
        spacing="20px">
        <Box h="130px" w="100%" p={5} mb={2} border="2px" rounded="md" borderColor="blue.500" />
        <Box h="130px" w="100%" p={5} mb={2} border="2px" rounded="md" borderColor="blue.500" />
        <Box h="130px" w="100%" p={5} mb={2} border="2px" rounded="md" borderColor="blue.500" />
        <Box h="130px" w="100%" p={5} mb={2} border="2px" rounded="md" borderColor="blue.500" />
        <Box h="130px" w="100%" p={5} mb={2} border="2px" rounded="md" borderColor="blue.500" />
        <Box h="130px" w="100%" p={5} mb={2} border="2px" rounded="md" borderColor="blue.500" />
        <Box h="130px" w="100%" p={5} mb={2} border="2px" rounded="md" borderColor="blue.500" />
        <Box h="130px" w="100%" p={5} mb={2} border="2px" rounded="md" borderColor="blue.500" />
      </VStack>
    </Box>
  );
};

export default selectedItemsPanel;
