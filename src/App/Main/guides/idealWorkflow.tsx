import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { Guide } from "src/lib/types";

const idealWorkflow: Guide = {
  id: 4,
  title: "How I use this app",
  description:
    "Presented my step by step process of using this app. as well as how I would go on about saving a session",
  body: (
    <OrderedList>
      <ListItem>
        <Text maxW="md">
          We&apos;ll start by searching for a product, In my case I will searching for a `mechanical
          keyboard`,
          <br />
          You can make the process of finding your product easier by narrowing down your options,
          <br />
          <br />
          In my case, I want to see products that are popular, and bought by many, So I set the
          `Sort By` option to `Sales`,
        </Text>
        <Box my="4" as="img" src="searchbar_demo.png" />
        <Box my="4" display="flex">
          <Box mr="5" as="img" width="150px" height="auto" src="filterpanel_demo.png" />
          <Text my="10" maxW="sm">
            I also want for the items to atleast have an average rating of 4 stars,
            <br />
            <br />
            I also want the price to be around 800 to 1200,
            <br />
            <br />
            and only show items that are from metro manila and are verified by shopee.
          </Text>
        </Box>
      </ListItem>
      <ListItem>
        <Text maxW="md">
          Select products that are possibly an option for you by clicking them, and to unselect them
          just click them again. Notice a `
          <Text as="span" fontWeight="600" color="green.600" size="sm">
            green
          </Text>
          ` border appear when the items are selected.
        </Text>
        <Box my="4" width="400px" height="auto" as="img" src="search_demo.png" />
      </ListItem>
      <ListItem>
        <Text maxW="md">
          After searching and selecting your products, we can now go ahead and compare them from
          each other. by clicking the `Compare Now` button
        </Text>
        <Box my="4" as="img" src="compare_button.png" />
      </ListItem>
      <ListItem>
        <Text maxW="md">
          You&apos;ll see a panel pop from the bottom, which we&apos;ll call the `Compare Panel`.
          and, the first two products that we have selected. We can compare them side by side here
          through price, sales, etc.
        </Text>
        <Box my="4" as="img" width="400px" height="auto" src="compare_demo.png" />
        <Text maxW="md">
          You may copy the item&apos;s shopee link by clicking the clipboard icon located on the top
          right of each cards
        </Text>
        <Box my="4" as="img" src="clipboard.png" />
        <Text maxW="md">
          at the lowest section of the card, you&apos;ll find the summary of the ratings as well as
          the ratings of the product. with the options of what star, and content of the ratings you
          want to see from the product.
        </Text>
        <Box display="flex">
          <Box my="4" width="300px" height="auto" as="img" src="ratings_summary.png" />
          <Box my="4" width="300px" height="auto" as="img" src="ratings_demo.png" />
        </Box>
      </ListItem>
      <ListItem>
        <Text maxW="md">
          Let&apos;s say we didn&apos;t liked product #2, we have two options here.
        </Text>
        <Box my="4" display="flex">
          <Box as="img" src="selecteditemcardoptions.png" />
          <Box>
            <Text my="3" maxW="xl">
              first is to remove them by clicking the this `x` icon
            </Text>
            <Text mt="8" maxW="xl">
              second, is to replace it by clicking this second option
            </Text>
          </Box>
        </Box>
        <Text>Repeat this process until you have a single item left, and bwallah</Text>
        <Box my="4" width="250px" as="img" src="mindblown.jpg" />
      </ListItem>
      <ListItem>
        One of the features this app is that you can bookmark your session, which It automatically
        does(go to bookmarks), in case you accidentally closed your browser, lost connection. or
        well, you want to bookmark your selected items.
        <br />
        To do this, just click the `Bookmark Items` in the selected items panel, and give your
        bookmark a title, and optionally add in a description.
      </ListItem>
      <ListItem>
        Hope you found this app useful, If you want to get in touch just head over to my website at{" "}
        <a href="https://romanmunar.netlify.app">https://romanmunar.netlify.app</a>
        {/* Mind blown image */}
      </ListItem>
    </OrderedList>
  ),
};

export default idealWorkflow;
