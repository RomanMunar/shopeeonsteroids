import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { SelectedItemCard } from "src/components/product";
import { BookmarkItem } from "src/lib/types";
import { arrayToNArray } from "src/lib/utils";

interface Props {
  displayedBookmark: BookmarkItem;
  compareBookmarkItems: (item: BookmarkItem) => void;
}

const rightPanel = ({ displayedBookmark, compareBookmarkItems }: Props) => {
  return (
    <Flex flexDirection="column" overflowY="auto" h="100vh" pt="5" flex="1" borderColor="blue.300">
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
            {displayedBookmark.title}
          </Heading>
          <Text maxW="lg">{displayedBookmark.description}</Text>
        </Box>
        <Button
          rightIcon={
            <svg
              fill="currentColor"
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              transform="rotate(180)"
              x="0px"
              y="0px">
              <g>
                <path d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"></path>
              </g>
            </svg>
          }
          mr="2"
          size="sm"
          colorScheme="blue"
          onClick={() => compareBookmarkItems(displayedBookmark)}>
          Compare Now
        </Button>
      </Flex>
      <Box h="full" p="8" borderY="1px" borderColor="gray.400" bg="gray.50" shadow="inner">
        <Flex flexWrap="wrap" flexDirection="row" justifyContent="flex-start" h="auto" maxW="5xl">
          {displayedBookmark.items.map((item) => (
            <Box key={item.itemid} maxW="33%">
              <SelectedItemCard item={item} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default rightPanel;
