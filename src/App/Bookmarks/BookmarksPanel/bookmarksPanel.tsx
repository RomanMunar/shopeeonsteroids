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
import { BookmarkItemCard } from "src/components/product";
import { BookmarkItem } from "src/lib/types";

interface Props {
  bookmarks: BookmarkItem[];
  displayedBookmark: BookmarkItem;
  previewBookmark: (item: BookmarkItem) => void;
  updateBookmarkDescription: (item: BookmarkItem, newDescription: string) => void;
  updateBookmarkTitle: (item: BookmarkItem, newTitle: string) => void;
  removeBookmarkItem: (item: BookmarkItem) => void;
  favoriteBookmark: (item: BookmarkItem) => void;
  unfavoriteBookmark: (item: BookmarkItem) => void;
}

const leftPanel = ({
  bookmarks,
  displayedBookmark,
  previewBookmark,
  updateBookmarkDescription,
  updateBookmarkTitle,
  removeBookmarkItem,
  favoriteBookmark,
  unfavoriteBookmark,
}: Props) => {
  return (
    <Flex
      flexDirection="column"
      overflowY="auto"
      h="100vh"
      w="300px"
      borderRight="1px"
      borderColor="gray.300"
      flex="none">
      <Heading as="h3" size="sm" px="2" py="4" alignSelf="start">
        BOOKMARKS
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
          {bookmarks.map((i) => (
            <BookmarkItemCard
              key={i.id}
              updateBookmarkDescription={updateBookmarkDescription}
              updateBookmarkTitle={updateBookmarkTitle}
              removeBookmarkItem={removeBookmarkItem}
              favoriteBookmark={favoriteBookmark}
              unfavoriteBookmark={unfavoriteBookmark}
              active={i.id === displayedBookmark.id}
              item={i}
              previewBookmark={previewBookmark}
            />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default leftPanel;
