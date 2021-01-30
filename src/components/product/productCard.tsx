import { Box, Flex, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "src/lib/hooks";
import { SearchItem } from "src/lib/types";
import { kFormat } from "src/lib/utils";
import { LazyBox, MotionBox } from "..";

interface Props {
  item: SearchItem;
  addToSelectedItems: (item: SearchItem) => void;
  removeToSelectedItems: (selectedItem: any & { itemid: number; shopid: number }) => void;
  selected: boolean;
}

const productCard = ({ item, addToSelectedItems, removeToSelectedItems, selected }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [renderImage, setRenderImage] = useState(false);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    if (!intersection) return;
    if (intersection.intersectionRatio >= 1) {
      setRenderImage(true);
    }
  }, [intersection]);

  const onClick = () => {
    selected ? removeToSelectedItems(item) : addToSelectedItems(item);
  };

  return (
    <MotionBox
      position="relative"
      whileTap={{ scale: 0.97 }}
      animate={{ y: hovered && !selected ? -10 : 0 }}
      bg="white"
      w="160px"
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
      <Box ref={intersectionRef} position="relative" width="100%" paddingTop="100%">
        <LazyBox load={renderImage}>
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
        </LazyBox>
      </Box>
      <Box p="2">
        <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
          {item.name}
        </Text>
        <Box my="2">
          <Flex my="1" alignItems="center" justifyContent="space-between">
            <Text fontSize="md" lineHeight="1rem" noOfLines={2}>
              ₱{item.price / 100000}
            </Text>
            <Text fontSize="sm" lineHeight="1rem" noOfLines={2}>
              {kFormat(item.sold)}
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
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>
  );
};

export default productCard;
