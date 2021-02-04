import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { Guide } from "src/lib/types";

const howToUseSearch: Guide = {
  id: 1,
  title: "How to `Search` for products",
  description: "A brief introduction on how to search a product.",
  body: (
    <OrderedList>
      <ListItem>
        Type in the keyword you want to search for, then press enter
        <Box as="img" border="1px" shadow="md" m="4" src="/searchbar.png" />
      </ListItem>
      <ListItem>
        You may also add in filters such as price range, minimum average rating, etc. by clicking
        those options in the filter panel
      </ListItem>
      <ListItem>You&apos;ll see the items related to your input</ListItem>
      <ListItem>
        Now, select the items you want to compare, you may toggle the selection of an item by
        clicking them.
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
        Now, head on to the `How to compare items` guide, It will give you all the things you need
        to know for comparing items.
      </Text>
    </OrderedList>
  ),
};

export default howToUseSearch;
