import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Nav } from ".";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="row">
      <Nav />
      <Box flexGrow={1} h="100vh" overflow="hidden">
        {children}
      </Box>
    </Flex>
  );
};

export default layout;
