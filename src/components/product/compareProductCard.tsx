import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  IconButton,
  Skeleton,
  StackDivider,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIntersection, usePrevious } from "src/lib/hooks";
import { RatingQuery } from "src/lib/types";
import { getRelativeTimeFormat, kFormat, toLocaleTime } from "src/lib/utils";
import { SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";
import { ImageSlider, MotionBox } from "..";

interface Props {
  selectedItem: SelectedItem | SelectedItemDetailed;
  fetchItemDetails: (item: SelectedItem | SelectedItemDetailed) => void;
  fetchShop: (item: SelectedItem | SelectedItemDetailed) => void;
  fetchRatings: (ratingQuery: RatingQuery, reset?: boolean) => void;
  copyShopeeUrl: (item: any & { itemid: number; shopid: number; name: string }) => void;
}

const RATINGS_LIMIT_PER_PAGE = 7;
const compareProductCard = ({
  selectedItem,
  fetchItemDetails,
  fetchShop,
  fetchRatings,
  copyShopeeUrl,
}: Props) => {
  const [ratingsContentFilter, setRatingsContentFilter] = useState<"images" | "comments" | "all">(
    "all"
  );
  const [ratingsType, setRatingsType] = useState(0);
  const [ratingsPage, setRatingsPage] = useState(1);
  const [exploredPages, setExploredPages] = useState([1]);
  const prevPage = usePrevious(ratingsPage);
  const prevType = usePrevious(ratingsType);
  const prevContentFilter = usePrevious(ratingsContentFilter);
  const [ratingImageDisplay, setRatingImageDisplay] = useState("");
  const ratingsIntersectionRef = useRef(null);
  const ratingsIntersection = useIntersection(ratingsIntersectionRef);
  const shopIntersectionRef = useRef(null);
  const shopIntersection = useIntersection(shopIntersectionRef);

  const incrementPage = () => {
    setRatingsPage((p) => p + 1);
  };

  const decrementPage = () => {
    setRatingsPage((p) => (p === 1 ? 1 : p - 1));
  };
  useEffect(() => setExploredPages((p) => [...p, ratingsPage]), [ratingsPage]);
  useEffect(() => fetchItemDetails(selectedItem), []);
  useEffect(() => {
    if (!shopIntersection) return;
    if (shopIntersection.intersectionRatio >= 1) {
      fetchShop(selectedItem);
    }
  }, [shopIntersection]);
  useEffect(() => {
    if (!ratingsIntersection) return;
    if (ratingsIntersection.intersectionRatio >= 1) {
      const ratingContentsQueryMap = {
        images: 3,
        comments: 1,
        all: 0,
      };
      fetchRatings({
        itemid: selectedItem.itemid,
        shopid: selectedItem.shopid,
        limit: RATINGS_LIMIT_PER_PAGE,
        offset: RATINGS_LIMIT_PER_PAGE + RATINGS_LIMIT_PER_PAGE * ratingsPage,
        filter: ratingContentsQueryMap[ratingsContentFilter],
        type: ratingsType,
      });
    }
  }, [ratingsIntersection]);

  useEffect(() => {
    const ratingContentsQueryMap = {
      images: 3,
      comments: 1,
      all: 0,
    };
    if (typeof prevPage !== "number") return;

    const reset = prevType !== ratingsType || prevContentFilter !== ratingsContentFilter;
    if (exploredPages.includes(ratingsPage) && !reset) return; // dont fetch if fetched in the past
    if (reset) {
      setExploredPages([1]);
      setRatingsPage(1);
    }
    fetchRatings(
      {
        itemid: selectedItem.itemid,
        shopid: selectedItem.shopid,
        limit: RATINGS_LIMIT_PER_PAGE,
        offset: RATINGS_LIMIT_PER_PAGE + RATINGS_LIMIT_PER_PAGE * ratingsPage,
        filter: ratingContentsQueryMap[ratingsContentFilter],
        type: ratingsType,
      },
      reset
    );
  }, [ratingsContentFilter, ratingsPage, ratingsType]);

  return (
    <Box
      m={2}
      w="full"
      bg="white"
      border="2px"
      rounded="md"
      borderColor="gray.400"
      overflowY="auto"
      overflowX="hidden"
      position="relative"
      maxW="lg">
      <ImageSlider images={selectedItem.images.map((i) => `https://cf.shopee.ph/file/${i}`)} />
      <Tooltip label="Copy Shopee Url">
        <IconButton
          size="sm"
          position="absolute"
          top="20px"
          right="15px"
          bg="white"
          shadow="md"
          color="blue.700"
          onClick={() => copyShopeeUrl(selectedItem)}
          aria-label="Copy shopee url">
          <svg
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </IconButton>
      </Tooltip>
      <Text m="4" noOfLines={2} fontSize="md" fontWeight="600" color="gray.800">
        {selectedItem.name}
      </Text>
      <Flex my="2" mx="6" alignItems="center" justifyContent="space-between">
        <Box>
          <Text display="inline" fontWeight="600" fontSize="md" lineHeight="1rem">
            ₱
          </Text>
          <Text display="inline" fontWeight="600" fontSize="2xl" lineHeight="1rem" noOfLines={2}>
            {selectedItem.price / 100000}
          </Text>
        </Box>
        <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
          {selectedItem.fetchStatus === "fulfilled" &&
            selectedItem.type === "detailed" &&
            kFormat(selectedItem.historical_sold)}{" "}
          Sold
        </Text>
      </Flex>
      <Flex my="2" mx="6" alignItems="center" justifyContent="space-between">
        <Flex>
          <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
            {selectedItem.item_rating.rating_star.toFixed(2)}{" "}
          </Text>
          <svg
            width="16px"
            height="16px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </Flex>
        <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
          {kFormat(selectedItem.liked_count)} Likes
        </Text>
      </Flex>
      <Flex p="4" flexWrap="wrap" flexDirection="row" my="4">
        {selectedItem.type === "detailed" && selectedItem.fetchStatus === "fulfilled" ? (
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
                  <Text key={i} color="gray.700" fontSize="xs">
                    {i}
                  </Text>
                ))}
              <Text fontSize="xs">₱{m.price / 100000}</Text>
            </Box>
          ))
        ) : (
          <Skeleton w="full" h="100px" />
        )}
      </Flex>
      {selectedItem.type === "detailed" && selectedItem.shop.fetchStatus === "fulfilled" ? (
        <Flex
          p="7"
          w="full"
          justifyContent="center"
          bg="gray.200"
          alignItems="center"
          flexDirection="column">
          <Flex mb="3" justifyContent="start" alignItems="center" flexDirection="row">
            <Box
              as="img"
              src={`https://cf.shopee.ph/file/${selectedItem.shop.account.portrait}`}
              h="40px"
              w="40px"
              rounded="full"
              bg="gray.400"
            />
            <Flex ml="2" flexDirection="column">
              <Text>{selectedItem.shop.name}</Text>
              <Text fontSize="sm" fontWeight="bold">
                {selectedItem.shop.account.total_avg_star.toFixed(1)}
              </Text>
            </Flex>
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Flex w="100%" flexDirection="column">
              <Text fontSize="sm">Followers</Text>
              <Text fontSize="sm" fontWeight="bold">
                {selectedItem.shop.follower_count}
              </Text>
            </Flex>
            <Flex w="100%" flexDirection="column">
              <Text fontSize="sm">Active</Text>
              <Text fontSize="sm" fontWeight="bold">
                {getRelativeTimeFormat(
                  new Date(),
                  new Date(selectedItem.shop.last_active_time * 1000)
                )}
              </Text>
            </Flex>
            <Flex w="100%" flexDirection="column">
              <Text fontSize="sm">Responds</Text>
              <Text fontSize="sm" fontWeight="bold">
                {selectedItem.shop.response_rate}%
              </Text>
            </Flex>
            <Flex w="100%" flexDirection="column">
              <Text fontSize="sm">Replies within</Text>
              <Text fontSize="sm" fontWeight="bold">
                {toLocaleTime(selectedItem.shop.response_time)}
              </Text>
            </Flex>
          </Grid>
        </Flex>
      ) : (
        <Flex
          p="7"
          bg="gray.200"
          w="full"
          h="210px"
          my="3"
          justifyContent="center"
          alignItems="center"
          flexDirection="column">
          <Flex my="3" justifyContent="start" alignItems="center" flexDirection="row">
            <Skeleton ref={shopIntersectionRef} rounded="full" h="40px" w="40px" />
            <Flex flexDirection="column">
              <Skeleton mb="1" w="60px" h="14px" />
              <Skeleton w="60px" h="14px" />
            </Flex>
          </Flex>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Flex w="100%" flexDirection="column">
              <Text fontSize="sm">Followers</Text>
              <Skeleton w="60px" h="14px" />
            </Flex>
            <Flex w="100%" flexDirection="column">
              <Text fontSize="sm">Active</Text>
              <Skeleton w="60px" h="14px" />
            </Flex>
            <Flex w="100%" flexDirection="column">
              <Text fontSize="sm">Responds</Text>
              <Skeleton w="60px" h="14px" />
            </Flex>
            <Flex w="100%" flexDirection="column">
              <Text fontSize="sm">Replies within</Text>
              <Skeleton w="60px" h="14px" />
            </Flex>
          </Grid>
        </Flex>
      )}
      <Box p="4" my="4">
        <Heading as="h3" mb="3" size="sm">
          Product Description
        </Heading>
        {selectedItem.fetchStatus === "fulfilled" && selectedItem.type === "detailed" ? (
          <Text
            my="2"
            fontSize="14px"
            lineHeight="1.85em"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="pre-wrap">
            {selectedItem.description}
          </Text>
        ) : (
          <Skeleton w="full" h="500px" />
        )}
      </Box>
      <Box p="4" my="4">
        <Heading as="h3" mb="3" size="sm">
          Ratings
        </Heading>
        <Box>
          <Flex
            flexDirection="column-reverse"
            mx="auto"
            mb="4"
            w="full"
            alignItems="center"
            maxW="sm">
            {selectedItem.item_rating.rating_count.slice(1).map((rating, idx) => (
              <Flex key={idx} alignItems="center" justifyContent="start" w="full">
                {idx + 1}{" "}
                <svg
                  width="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <Box
                  rounded="lg"
                  w={(rating / selectedItem.item_rating.rating_count[0]) * 100 + "%"}
                  h="20px"
                  bg="yellow.300"
                  mx="2"
                />
                {((rating / selectedItem.item_rating.rating_count[0]) * 100).toFixed(1) + "%"}
              </Flex>
            ))}
          </Flex>
        </Box>
        <Flex justifyContent="start" alignItems="start" flexDirection="column">
          <Box>
            <Text fontWeight="semibold">Contains</Text>
            <ButtonGroup mb="4" size="sm" isAttached variant="outline">
              <Button
                color={ratingsContentFilter === "images" ? "gray.600" : "gray.800"}
                onClick={() => setRatingsContentFilter("images")}>
                With Images
              </Button>
              <Button
                color={ratingsContentFilter === "comments" ? "gray.600" : "gray.800"}
                onClick={() => setRatingsContentFilter("comments")}>
                With Comments
              </Button>
              <Button
                color={ratingsContentFilter === "all" ? "gray.600" : "gray.800"}
                onClick={() => setRatingsContentFilter("all")}>
                All
              </Button>
            </ButtonGroup>
          </Box>
          <Flex w="full" justifyContent="space-between" alignItems="flex-end">
            <Box>
              <Text fontWeight="semibold">Ratings with</Text>
              <ButtonGroup isAttached size="sm" variant="outline">
                {[1, 2, 3, 4, 5].map((r) => (
                  <Button
                    key={r}
                    color={ratingsType === r ? "gray.600" : "gray.800"}
                    onClick={() => setRatingsType(r)}>
                    {r}
                    <svg
                      width="12px"
                      height="12px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </Button>
                ))}
                <Button
                  color={ratingsType === 0 ? "gray.600" : "gray.800"}
                  onClick={() => setRatingsType(0)}>
                  All
                </Button>
              </ButtonGroup>
            </Box>
            <ButtonGroup isAttached size="sm">
              <Button onClick={decrementPage}>Prev</Button>
              <Button onClick={incrementPage}>Next</Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </Box>
      <VStack
        py="4"
        px="8"
        spacing="2"
        divider={<StackDivider borderColor="gray.400" />}
        borderY="1px"
        borderColor="gray.400"
        bg="gray.50"
        shadow="inner"
        display="flex">
        {selectedItem.type === "detailed" && selectedItem.ratings.fetchStatus === "fulfilled" ? (
          selectedItem.ratings.ratings
            .slice(
              ratingsPage === 1 ? 0 : ratingsPage * RATINGS_LIMIT_PER_PAGE - RATINGS_LIMIT_PER_PAGE,
              RATINGS_LIMIT_PER_PAGE * ratingsPage
            )
            .map((r) => (
              <Flex
                key={r.author_username}
                w="100%"
                justifyContent="start"
                my="10px"
                flexDirection="column">
                <Flex mb="2" justifyContent="start" alignItems="center" flexDirection="row">
                  {r.author_portrait ? (
                    <Box
                      as="img"
                      src={`https://cf.shopee.ph/file/${r.author_portrait}`}
                      h="40px"
                      w="40px"
                      rounded="full"
                    />
                  ) : (
                    <Box
                      h="40px"
                      w="40px"
                      rounded="full"
                      bgGradient="linear(to-b, blue.300, blue.500)"
                    />
                  )}
                  <Flex ml="2" flexDirection="column">
                    <Text fontSize="xs">{r.author_username}</Text>
                    <Text fontSize="xs" fontWeight="bold">
                      {r.rating_star.toFixed(1)}
                    </Text>
                  </Flex>
                </Flex>
                <Box w="80%" ml="auto">
                  <Text
                    whiteSpace="pre-wrap"
                    noOfLines={4}
                    flexGrow={1}
                    fontSize="sm"
                    marginY="2"
                    px="1">
                    {r.comment}
                  </Text>
                  {r.images && r.images.length > 0 && (
                    <Flex w="full" overflow="visible" z="40" flexDirection="row" flexWrap="wrap">
                      {r.images.slice(0, 5).map((i) => (
                        <Box key={i} w="auto" position="relative" mb="1">
                          <Box
                            onMouseOver={() => setRatingImageDisplay(i)}
                            onMouseLeave={() => setRatingImageDisplay("")}
                            as="img"
                            src={`https://cf.shopee.ph/file/${i}`}
                            zIndex="4"
                            cursor="pointer"
                            minW="60px"
                            maxW="60px"
                            h="60px"
                            mx="1"
                            bg="white"
                            border="2px"
                            borderColor="gray.600"
                          />

                          <AnimatePresence>
                            {ratingImageDisplay === i && (
                              <MotionBox
                                bottom="60px"
                                position="absolute"
                                initial={{
                                  opacity: 0,
                                  x: 0,
                                  width: 60,
                                  height: 60,
                                }}
                                exit={{
                                  opacity: 0,
                                  x: 0,
                                  width: 60,
                                  height: 60,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: -100,
                                  width: 250,
                                  height: 250,
                                }}
                                // @ts-ignore
                                transition={{ type: "tween", duration: 0.2 }}
                                shadow="lg">
                                <Box
                                  as="img"
                                  w="full"
                                  h="full"
                                  src={`https://cf.shopee.ph/file/${i}`}
                                />
                              </MotionBox>
                            )}
                          </AnimatePresence>
                        </Box>
                      ))}
                    </Flex>
                  )}
                </Box>
              </Flex>
            ))
        ) : (
          <>
            <Skeleton ref={ratingsIntersectionRef} h="200px" w="full" m="4" />
            <Skeleton h="200px" w="full" m="4" />
            <Skeleton h="200px" w="full" m="4" />
          </>
        )}
      </VStack>
    </Box>
  );
};

export default compareProductCard;
