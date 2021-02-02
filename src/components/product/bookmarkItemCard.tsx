import {
  Box,
  Button,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BookmarkItem } from "src/lib/types";

interface Props {
  item: BookmarkItem;
  active: boolean;
  previewBookmark: (item: BookmarkItem) => void;
  updateBookmarkDescription: (item: BookmarkItem, newDescription: string) => void;
  updateBookmarkTitle: (item: BookmarkItem, newTitle: string) => void;
  removeBookmarkItem: (item: BookmarkItem) => void;
}

const bookmarkItemCard = ({
  item,
  active,
  previewBookmark,
  updateBookmarkDescription,
  updateBookmarkTitle,
  removeBookmarkItem,
}: Props) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  return (
    <Box position="relative" w="full">
      <Box
        bg={active ? "blue.50" : "gray.50"}
        borderLeft="4px"
        borderColor={active ? "blue.300" : "transparent"}
        cursor="pointer"
        w="full"
        px="4"
        py="2"
        onClick={() => previewBookmark(item)}>
        <Input
          bg={editingTitle ? "yellow.100" : "transparent"}
          cursor={editingTitle ? "text" : "pointer"}
          w="auto"
          value={item.title}
          isReadOnly={!editingTitle}
          ref={titleRef}
          variant="unstyled"
          fontWeight="bold"
          onChange={(e) => {
            updateBookmarkTitle(item, e.target.value);
          }}
          onBlur={() => setEditingTitle(false)}
        />
        {editingDescription ? (
          <Textarea
            resize="none"
            bg={editingDescription ? "yellow.100" : "transparent"}
            value={item.description}
            isReadOnly={!editingDescription}
            ref={descriptionRef}
            overflow="hidden"
            my="1"
            wordBreak="break-all"
            variant="unstyled"
            onChange={(e) => {
              updateBookmarkDescription(item, e.target.value);
            }}
            onBlur={() => setEditingDescription(false)}
          />
        ) : (
          <Text noOfLines={3} my="1" wordBreak="break-all">
            {item.description}
          </Text>
        )}
      </Box>
      <Popover autoFocus={false} placement="right-start">
        <PopoverTrigger>
          <IconButton
            position="absolute"
            p="1"
            top="10px"
            right="10px"
            aria-label="menu"
            size="xs"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            }
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="170px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Button
                size="sm"
                variant="unstyled"
                cursor="pointer"
                onClick={() => {
                  setEditingTitle(true);
                  titleRef.current?.focus();
                }}>
                Rename Title
              </Button>
              <Button
                size="sm"
                variant="unstyled"
                cursor="pointer"
                onClick={() => {
                  setEditingDescription(true);
                  descriptionRef.current?.focus();
                }}>
                Update Description
              </Button>
              <Button
                size="sm"
                variant="unstyled"
                cursor="pointer"
                color="red.700"
                onClick={() => {
                  removeBookmarkItem(item);
                }}>
                Delete Bookmark
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
};

export default bookmarkItemCard;
