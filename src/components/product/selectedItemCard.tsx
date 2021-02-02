import { Box, Flex, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";
import { MotionBox } from "..";

interface Props {
  item: SelectedItem | SelectedItemDetailed;
  removeToSelectedItems?: (selectedItem: any & { itemid: number; shopid: number }) => void;
  toFirstItem?: (item: any & { itemid: number; shopid: number }) => void;
  toSecondItem?: (item: any & { itemid: number; shopid: number }) => void;
  toThirdItem?: (item: any & { itemid: number; shopid: number }) => void;
}

const selectedItemCard = ({
  item,
  removeToSelectedItems,
  toFirstItem,
  toSecondItem,
  toThirdItem,
}: Props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      width="full"
      position="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <Box display="flex" alignItems="center" rounded="md" w="100%" h="130px">
        <Box
          border="1px"
          borderColor="gray.300"
          rounded="md"
          mx="2"
          overflow="hidden"
          height="100px"
          width="100px"
          position="relative"
          flexShrink={0}>
          <Box
            as="img"
            position="absolute"
            top="0"
            left="0"
            width="auto"
            bg="#fff"
            src={`https://cf.shopee.ph/file/${item.image}`}
            alt={item.name}
          />
        </Box>
        <Box mx="2" flexShrink={1} w="full">
          <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
            {item.name}
          </Text>
          <Box my="2">
            <Flex my="1" alignItems="center" justifyContent="space-between">
              <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
                ₱{item.price / 100000}
              </Text>
              <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
                {item.sold}
              </Text>
            </Flex>
            <Flex my="1" alignItems="center" justifyContent="space-between">
              <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
                {item.item_rating.rating_star.toFixed(2)}
              </Text>
              <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
                {item.liked_count}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
      {removeToSelectedItems && (
        <AnimatePresence>
          {hovered && (
            <MotionBox
              initial={{
                opacity: 0,
                translateX: 20,
              }}
              exit={{
                opacity: 0,
                translateX: 20,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              bg="red.200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => removeToSelectedItems(item)}
              rounded="md"
              p="1"
              position="absolute"
              top="10px"
              right="10px">
              <svg
                width="15px"
                height="15px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </MotionBox>
          )}
        </AnimatePresence>
      )}
      {toFirstItem && (
        <AnimatePresence>
          {hovered && (
            <MotionBox
              initial={{
                opacity: 0,
                translateX: 40,
              }}
              exit={{
                opacity: 0,
                translateX: 40,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              bg="gray.200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toFirstItem(item)}
              rounded="md"
              p="1"
              position="absolute"
              top="40px"
              right="10px">
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="2" y="4" width="10" height="18" rx="2" />
                <rect strokeOpacity="0.5" x="12" y="4" width="10" height="18" rx="2" />
              </svg>
            </MotionBox>
          )}
        </AnimatePresence>
      )}
      {toSecondItem && (
        <AnimatePresence>
          {hovered && (
            <MotionBox
              initial={{
                opacity: 0,
                translateX: 60,
              }}
              exit={{
                opacity: 0,
                translateX: 60,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              bg="gray.200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toSecondItem(item)}
              rounded="md"
              p="1"
              position="absolute"
              top="70px"
              right="10px">
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect strokeOpacity="0.5" x="2" y="4" width="10" height="18" rx="2" />
                <rect x="12" y="4" width="10" height="18" rx="2" />
              </svg>
            </MotionBox>
          )}
        </AnimatePresence>
      )}
      {toThirdItem && (
        <AnimatePresence>
          {hovered && (
            <MotionBox
              initial={{
                opacity: 0,
                translateX: 80,
              }}
              exit={{
                opacity: 0,
                translateX: 80,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              bg="gray.200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toThirdItem(item)}
              rounded="md"
              p="1"
              position="absolute"
              top="100px"
              right="10px">
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect strokeOpacity="0.2" x="1" y="4" width="5" height="16" rx="2" />
                <rect strokeOpacity="0.2" x="6" y="4" width="5" height="16" rx="2" />
                <rect strokeWidth="2" x="12" y="4" width="6" height="16" rx="2" />
              </svg>
            </MotionBox>
          )}
        </AnimatePresence>
      )}
    </Box>
  );
};

export default selectedItemCard;
