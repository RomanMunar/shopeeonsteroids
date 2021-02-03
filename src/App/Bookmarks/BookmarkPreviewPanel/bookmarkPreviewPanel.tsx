import { Box, Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { ArrowNext, ArrowRight } from "src/components/icons";
import { SelectedItemCard } from "src/components/product";
import { BookmarkItem } from "src/lib/types";

interface Props {
  displayedBookmark: BookmarkItem;
  compareBookmarkItems: (item: BookmarkItem) => void;
}

const rightPanel = ({ displayedBookmark, compareBookmarkItems }: Props) => {
  const isMobile = useMediaQuery("(max-width: 500px)")[0];

  return (
    <Flex flexDirection="column" overflowY="auto" pt="5" flex="1" borderColor="blue.300">
      <Flex
        mx="auto"
        maxW="5xl"
        justifyContent="space-between"
        alignItems="flex-end"
        w="full"
        flexDirection={["column", "row"]}
        py={[2, 5]}
        px="8"
        my="3">
        <Box w="full" mb={[2, 0]}>
          <Heading mb="3" as="h3" size="lg" alignSelf="start">
            {displayedBookmark.title}
          </Heading>
          <Text maxW="lg">{displayedBookmark.description}</Text>
        </Box>
        <Button
          rightIcon={<ArrowNext width="20px" height="20px" transform="rotate(180)" />}
          mr="2"
          size="sm"
          colorScheme="blue"
          onClick={() => compareBookmarkItems(displayedBookmark)}>
          Compare Now
        </Button>
      </Flex>
      <Box
        h="full"
        p="8"
        borderY="1px"
        borderColor="gray.400"
        bg="gray.50"
        shadow="inner"
        pb={isMobile ? "100px" : 0}>
        <Flex
          flexWrap="wrap"
          flexDirection="row"
          justifyContent="flex-start"
          h="auto"
          maxW="5xl"
          mx="auto">
          {displayedBookmark.items.map((item) => (
            <Box key={item.itemid} maxW="340px">
              <SelectedItemCard item={item} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default rightPanel;
