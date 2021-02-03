import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  StackDivider,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MotionBox } from "src/components";
import { ArrowRight, Search } from "src/components/icons";
import { BookmarkItemCard } from "src/components/product";
import { BookmarkItem } from "src/lib/types";

interface Props {
  bookmarks: BookmarkItem[];
  displayedBookmark: BookmarkItem;
  previewBookmark: (item: BookmarkItem) => void;
  updateBookmarkDescription: (item: BookmarkItem, newDescription: string) => void;
  updateBookmarkTitle: (item: BookmarkItem, newTitle: string) => void;
  removeBookmarkItem: (item: BookmarkItem) => void;
}

const leftPanel = ({
  bookmarks,
  displayedBookmark,
  previewBookmark,
  updateBookmarkDescription,
  updateBookmarkTitle,
  removeBookmarkItem,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 500px)")[0];
  const [collapsed, setCollapse] = useState(isMobile);
  const toggleCollapse = () => setCollapse((p) => !p);
  return (
    <MotionBox
      animate={{
        overflowY: collapsed ? "hidden" : "auto",
        width: collapsed ? 0 : "300px",
        height: isMobile ? (collapsed ? "50px" : "100vh") : "100vh",
        bottom: isMobile ? (collapsed ? 50 : 0) : 0,
      }}
      left={0}
      p={collapsed ? 5 : 0}
      bg="white"
      position={["absolute", "relative"]}
      zIndex="90"
      overflowY="auto"
      borderRight={isMobile ? (collapsed ? 0 : "1px") : "1px"}
      borderColor="gray.300"
      flex="none">
      <Box display={collapsed ? "none" : "flex"} flexDirection="column">
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
                active={i.id === displayedBookmark.id}
                item={i}
                previewBookmark={previewBookmark}
              />
            ))}
          </VStack>
        </Box>
      </Box>
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

export default leftPanel;
