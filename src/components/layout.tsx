import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Nav } from ".";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="row">
      <Nav />
      {children}
    </Flex>
  );
};

export default layout;
