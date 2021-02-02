import { Guide } from "src/lib/types";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface Props {
  displayedGuide: Guide;
}

const guidePreviewPanel = ({ displayedGuide }: Props) => {
  return (
    <Flex flexDirection="column" overflowY="auto" pt="5" flex="1">
      <Flex
        maxW="5xl"
        justifyContent="space-between"
        alignItems="flex-end"
        flexDirection="row"
        py="5"
        px="8"
        my="3">
        <Box>
          <Heading mb="3" as="h3" size="lg" alignSelf="start">
            {displayedGuide.title}
          </Heading>
          <Text maxW="lg">{displayedGuide.description}</Text>
        </Box>
      </Flex>
      <Box flex="1" p="8" borderY="1px" borderColor="gray.400" bg="gray.50" shadow="inner">
        <Flex flexWrap="wrap" flexDirection="row" justifyContent="flex-start" h="auto" maxW="5xl">
          {displayedGuide.body}
        </Flex>
      </Box>
    </Flex>
  );
};

export default guidePreviewPanel;
