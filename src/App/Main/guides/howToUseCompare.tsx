import { Guide } from "src/lib/types";
import { Box, Text, UnorderedList, ListItem, Flex } from "@chakra-ui/react";

const howToCompare: Guide = {
  id: 3,
  title: "How to `Compare` selected items",
  description: "A depth introduction to the compare features of this app.",
  body: (
    <UnorderedList>
      <ListItem>
        After searching for products, and selecting all of the items you want to compare, click the
        compare button.
        <Box as="img" border="1px" shadow="md" m="4" src="/compare_button.png" />
      </ListItem>
      <ListItem>After doing this, a compare panel display will popup.</ListItem>
      <ListItem>
        You&apos;ll see different buttons here namely, the{" "}
        <ListItem ml="5">
          <Text as="span" fontWeight="bold">
            Back To search
          </Text>{" "}
          button, Pressing this will simply bring back the search panel.
          <Box as="img" border="1px" shadow="md" m="4" src="/backtosearch.png" />
        </ListItem>
        <ListItem ml="5">
          and the{" "}
          <Text as="span" fontWeight="bold">
            Layout Buttons
          </Text>{" "}
          <Flex flexDirection="row">
            <Box as="img" border="1px" shadow="md" m="4" src="/layoutbuttons.png" />
            <Flex flexDirection="column" maxW="md">
              <Text m="1" as="span">
                the first button is the `doubled item layout`. <br />
                displays `2` items side by side
              </Text>
              <Text m="1" as="span">
                The second button is the `swap button`.
                <br />
                Swaps the first and second item
              </Text>
              <Text m="1" as="span">
                the third button is the `tripled item layout`.
                <br /> displays `3` items side by side
              </Text>
            </Flex>
          </Flex>
        </ListItem>
      </ListItem>
      <ListItem>
        Once Finished selecting, click the `Compare Now` button located on the top right of the
        searchbar.
        <Box as="img" border="1px" shadow="md" m="4" src="/compare_button.png" />
      </ListItem>
      <Text>
        Great! We have now learned how to use the search functionality of the app, and very briefly
        compare them.
      </Text>
      <Text>
        Now, head on to the `All about compare` guide, It will give you all the things you need to
        know for comparing items.
      </Text>
    </UnorderedList>
  ),
};

export default howToCompare;
