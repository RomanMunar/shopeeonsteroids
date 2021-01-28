import { Box, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";
import { ImageSlider } from "..";

interface Props {
  selectedItem: SelectedItem | SelectedItemDetailed;
  fetchItemDetails: (item: SelectedItem | SelectedItemDetailed) => void;
}

const compareProductCard = ({ selectedItem, fetchItemDetails }: Props) => {
  useEffect(() => fetchItemDetails(selectedItem), []);

  return (
    <Box
      m={2}
      bg="white"
      border="2px"
      rounded="md"
      borderColor="gray.400"
      overflow="hidden"
      w="full">
      <ImageSlider images={selectedItem.images.map((i) => `https://cf.shopee.ph/file/${i}`)} />
      <Box p="2">
        <Text m="2" noOfLines={2} fontSize="md" fontWeight="600" color="gray.800">
          {selectedItem.name}
        </Text>
        <Box my="2">
          <Flex m="2" alignItems="center" justifyContent="space-between">
            <Box>
              <Text display="inline" fontWeight="600" fontSize="md" lineHeight="1rem">
                ₱
              </Text>
              <Text
                display="inline"
                fontWeight="600"
                fontSize="2xl"
                lineHeight="1rem"
                noOfLines={2}>
                {selectedItem.price / 100000}
              </Text>
            </Box>
            <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
              {selectedItem.fetchStatus === "fulfilled" &&
                selectedItem.type === "detailed" &&
                selectedItem.historical_sold}{" "}
              Sold
            </Text>
          </Flex>
          <Flex m="2" alignItems="center" justifyContent="space-between">
            <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
              {selectedItem.item_rating.rating_star.toFixed(2)}
            </Text>
            <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
              {selectedItem.liked_count}
            </Text>
          </Flex>
          <Flex flexWrap="wrap" flexDirection="row" my="4">
            {selectedItem.fetchStatus === "fulfilled" &&
              selectedItem.type === "detailed" &&
              selectedItem.models.map((m) => (
                <Box
                  rounded="sm"
                  border="1px"
                  borderColor="gray.500"
                  shadow="sm"
                  key={m.name}
                  p="2px"
                  px="6px"
                  m="1"
                  lineHeight="1rem">
                  <Text isTruncated fontSize="sm">
                    {m.name.split(",")[0]}
                  </Text>
                  {m.name
                    .split(",")
                    .slice(1)
                    .map((i) => (
                      <Text key={i} fontColor="gray.700" fontSize="xs">
                        {i}
                      </Text>
                    ))}
                  <Text fontSize="xs">₱{m.price / 100000}</Text>
                </Box>
              ))}
          </Flex>

          {selectedItem.fetchStatus === "fulfilled" && selectedItem.type === "detailed" ? (
            <Box p="2" my="4">
              <Heading as="h3" size="sm">
                Product Description
              </Heading>
              <Text
                my="2"
                fontSize="14px"
                lineHeight="1.85em"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="pre-wrap">
                {selectedItem.description}
              </Text>
            </Box>
          ) : (
            <Skeleton w="full" h="500px" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default compareProductCard;
