import { Box, Heading } from "@chakra-ui/react";

const rightPanel = () => {
  return (
    <Box overflowY="auto" h="100vh" w="220px" borderColor="blue.300" flex="none">
      <Heading as="h3" size="sm" p={4} alignSelf="start">
        FILTER
      </Heading>
    </Box>
  );
};

export default rightPanel;
