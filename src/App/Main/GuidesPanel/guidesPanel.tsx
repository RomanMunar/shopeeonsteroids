import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  StackDivider,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { MotionBox } from "src/components";
import { ArrowRight, Search } from "src/components/icons";
import { GuideItemCard } from "src/components/product";
import { Guide } from "src/lib/types";

interface Props {
  guides: Guide[];
  displayedGuide: Guide;
  previewGuide: (item: Guide) => void;
  collapsed: boolean;
  toggleCollapse: () => void;
}

const guidesPanel = ({ guides, displayedGuide, previewGuide }: Props) => {
  const [collapsed, setCollapse] = useState(false);
  const toggleCollapse = () => setCollapse((p) => !p);
  const isMobile = useMediaQuery("(max-width: 500px)")[0];

  return (
    <MotionBox
      animate={{
        overflowY: collapsed ? "hidden" : "auto",
        width: collapsed ? 0 : "300px",
        height: isMobile ? (collapsed ? "50px" : "100vh") : "100vh",
        bottom: isMobile ? (collapsed ? 50 : 0) : 0,
      }}
      p={collapsed ? 5 : 0}
      bg="white"
      position={["absolute", "relative"]}
      left={0}
      zIndex="90"
      borderRight={isMobile ? (collapsed ? 0 : "1px") : "1px"}
      borderColor="gray.300"
      overflowX="hidden"
      h="100vh"
      flexDirection="row">
      <MotionBox
        animate={{
          visibility: collapsed ? "hidden" : "visible",
        }}
        opacity={collapsed ? 0 : 1}
        display="flex"
        flexDirection="column"
        overflowY="auto"
        h="100vh"
        w="300px"
        borderRight="1px"
        borderColor="gray.300"
        flex="none">
        <Heading as="h3" size="sm" px="2" py="4" alignSelf="start">
          ONBOARDING GUIDES 🎉🎉
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
            bg="gray.50"
            spacing="0px"
            w="full"
            divider={<StackDivider borderColor="gray.300" />}>
            {guides.map((g) => (
              <GuideItemCard
                key={g.id}
                guide={g}
                active={displayedGuide.id === g.id}
                previewGuide={previewGuide}
              />
            ))}
          </VStack>
        </Box>
      </MotionBox>
      <MotionBox
        animate={{ rotate: collapsed ? -180 : 0 }}
        border={isMobile ? "2px" : "0"}
        borderColor={isMobile ? "gray.300" : "0"}
        position="absolute"
        top="8px"
        right="8px"
        as="button"
        onClick={toggleCollapse}
        alignItems="center"
        justifyContent="center"
        display="flex"
        rounded="md"
        minW="30px"
        minH="30px"
        maxW="30px"
        maxH="30px">
        <ArrowRight width="20px" height="20px" />
      </MotionBox>
    </MotionBox>
  );
};

export default guidesPanel;
