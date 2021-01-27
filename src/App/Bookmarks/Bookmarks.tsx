import { Flex } from "@chakra-ui/react";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

const Bookmarks = () => (
  <Flex overflowY="hidden" h="100vh" w="full" flexDirection="row">
    <LeftPanel />
    <RightPanel />
  </Flex>
);

export default Bookmarks;
