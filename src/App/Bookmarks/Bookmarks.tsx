import { Layout } from "src/components";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { Flex } from "@chakra-ui/react";

const Bookmarks = () => (
  <Flex overflowY="hidden" h="100vh" w="full" flexDirection="row">
    <LeftPanel />
    <RightPanel />
  </Flex>
);

Bookmarks.Layout = Layout;

export default Bookmarks;
