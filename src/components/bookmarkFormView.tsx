import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ReactNode, useRef, useState } from "react";
import { BookmarkItem } from "src/lib/types";
import { SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";
import { SelectedItemCard } from "./product";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  selectedItems: (SelectedItem | SelectedItemDetailed)[];
  addToBookmarks: (title: string, description: string) => void;
}

const bookmarkFormView = ({ onClose, isOpen, selectedItems, addToBookmarks }: Props) => {
  const firstField = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const onSubmit = () => addToBookmarks(title, description);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a Bookmark</DrawerHeader>

          <DrawerBody
            shadow="inner"
            bg="gray.50"
            borderY="1px"
            borderColor="gray.400"
            py="4"
            px="3"
            overflowX="hidden">
            <Stack px="2" spacing="24px">
              <Box>
                <RequiredFormLabel htmlFor="title">Title</RequiredFormLabel>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  ref={firstField}
                  id="title"
                  placeholder="Please enter bookmarks' title"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  id="desc"
                />
              </Box>
              <Box>
                <Text px="2">Selected Items</Text>
                {selectedItems.map((i) => (
                  <SelectedItemCard key={i.name} item={i} />
                ))}
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter pt="2">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSubmit}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const RequiredFormLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => (
  <FormLabel htmlFor={htmlFor}>
    {children}{" "}
    <Text display="inline" color="red.500">
      *
    </Text>
  </FormLabel>
);

export default bookmarkFormView;
