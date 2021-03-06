import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Guide } from "src/lib/types";

const howToBookmark: Guide = {
  id: 2,
  title: "How to `Bookmark` a session",
  description: "Instruction for bookmarking a session and how to reuse them on your next visit.",
  body: (
    <UnorderedList>
      <ListItem>
        After searching for products, and selecting all of the items you want to bookmark, click the
        `Bookmark items` button.
        <Box as="img" border="1px" shadow="md" m="4" src="/bookmarkitems.png" />
      </ListItem>
      <ListItem>
        A Sidebar will popup, containing the title field, description field, and the items to be
        bookmarked.
        <Box display="flex">
          <Box as="img" border="1px" shadow="md" m="4" src="/bookmarkpanel.png" />
          <Flex flexDirection="column" alignItems="center" justifyContent="space-around" p="5">
            <Box>
              <Text mb="5">Add in the `title` of your bookmark, </Text>
              <Text> and optionally add in a `description`.</Text>
            </Box>
            <Text>Then press the save button once done.</Text>
          </Flex>
        </Box>
      </ListItem>
      <ListItem>
        You&apos;ve created your first bookmark, 🎉 HOORAY 🎉
        <br />
        <Box as="img" border="1px" shadow="md" m="4" src="/bookmarkdisplay.png" />
        To see your bookmarks, go the `Bookmarks` route by clicking the bookmark icon in the side
        bar.
        <Box as="img" border="1px" shadow="md" m="4" src="/bookmarkroute.png" />
      </ListItem>
      <ListItem>
        If You want to use your bookmarked items again, just click the `Compare Now` button to go
        and compare your bookmarked items
      </ListItem>
    </UnorderedList>
  ),
};

export default howToBookmark;
