import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { Search } from "src/components/icons";
import { GuideItemCard } from "src/components/product";
import { Guide } from "src/lib/types";

interface Props {
  guides: Guide[];
  displayedGuide: Guide;
  previewGuide: (item: Guide) => void;
}

const guidesPanel = ({ guides, displayedGuide, previewGuide }: Props) => {
  return (
    <Flex overflowY="hidden" h="100vh" flexDirection="row">
      <Flex
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
      </Flex>
    </Flex>
  );
};

export default guidesPanel;
