import { Box, Flex, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SearchItem } from "src/lib/types";
import { kFormat } from "src/lib/utils";
import { MotionBox } from "..";
import { Close, Like, Star } from "../icons";

interface Props {
  item: SearchItem;
  addToSelectedItems: (item: SearchItem) => void;
  removeToSelectedItems: (selectedItem: any & { itemid: number; shopid: number }) => void;
  selected: boolean;
}

const productCard = ({ item, addToSelectedItems, removeToSelectedItems, selected }: Props) => {
  const [hovered, setHovered] = useState(false);

  const onClick = () => {
    selected ? removeToSelectedItems(item) : addToSelectedItems(item);
  };

  return (
    <MotionBox
      position="relative"
      whileTap={{ scale: 0.97 }}
      animate={{ y: hovered && !selected ? -10 : 0 }}
      bg="white"
      w={["150px", "160px"]}
      onClick={onClick}
      m={2}
      border="2px"
      rounded="md"
      borderColor={selected ? "green.200" : "gray.100"}
      shadow={hovered ? "md" : "sm"}
      overflow="hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      layoutId={`card-container-${item.itemid}`}>
      <Box position="relative" width="100%" paddingTop="100%">
        <Box
          as="img"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="#fff"
          src={`https://cf.shopee.ph/file/${item.image}`}
          alt=""
        />
      </Box>
      <Box p="2">
        <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
          {item.name}
        </Text>
        <Box my="2">
          <Flex my="1" alignItems="center" justifyContent="space-between">
            <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
              ₱
              {Math.floor(item.price / 100000).toString().length > 4
                ? kFormat(Math.floor(item.price / 100000))
                : Math.floor(item.price / 100000)}
            </Text>
            <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
              {kFormat(item.sold)}{" "}
              <Box as="span" fontSize="xs">
                sold/mon
              </Box>
            </Text>
          </Flex>
          <Flex my="1" alignItems="center" justifyContent="space-between">
            <Flex>
              <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
                {item.item_rating.rating_star.toFixed(2)}
              </Text>{" "}
              <Star width="16px" height="16px" />
            </Flex>
            <Flex alignItems="center">
              <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
                {item.liked_count}
              </Text>{" "}
              <Like width="14px" height="14px" />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <AnimatePresence>
        {hovered && (
          <MotionBox
            initial={{
              opacity: 0,
              translateY: -20,
            }}
            exit={{
              opacity: 0,
              translateY: -20,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
              background: selected ? "#FEB2B2" : "#68D391",
            }}
            rounded="md"
            p="1"
            position="absolute"
            top="10px"
            right="10px">
            <MotionBox animate={{ rotate: selected ? 0 : 135 }}>
              <Close width="15px" height="15px" />
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>
  );
};

export default productCard;
