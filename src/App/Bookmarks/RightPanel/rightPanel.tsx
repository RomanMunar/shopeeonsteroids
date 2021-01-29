import { Box, Heading, Text } from "@chakra-ui/react";

const rightPanel = () => {
  return (
    <Box overflowY="auto" h="100vh" p={4} pt="10" flex="1" borderColor="blue.300">
      <Heading as="h3" size="lg" alignSelf="start">
        Replacement for hazelnut coffee
      </Heading>
      <Text my="4">
        Coffee Grounds I&apos;ll test in the future, getting pretty used to the taste of hazelnut
        want something new
      </Text>
    </Box>
  );
};

export default rightPanel;
