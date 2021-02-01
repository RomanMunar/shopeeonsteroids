import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { useState } from "react";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface Props {
  images: string[];
}

export const imageSlider = ({ images }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Box
      w="full"
      display="flex"
      pb="50px"
      alignItems="center"
      justifyContent="center"
      position="relative">
      <Box w="300px" h="300px">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              width: "300px",
              height: "300px",
              backgroundSize: "cover",
              backgroundImage: `url(${images[imageIndex]})`,
            }}
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 500, damping: 50 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
      </Box>
      <Box position="absolute" top="0" left="0" w="full" h="full" bg="gray.200" />
      <Box
        zIndex="2"
        display="flex"
        position="absolute"
        bottom="0"
        left="0"
        w="full"
        overflowX="scroll"
        px="4"
        bgGradient="linear(to-b, transparent, black)">
        {images.map((i, idx) => (
          <Box
            as="img"
            src={images[idx]}
            cursor="pointer"
            minW="60px"
            h="60px"
            mx="1"
            bg="white"
            border="2px"
            borderColor={page === idx ? "blue.300" : "gray.600"}
            onClick={() => setPage([idx, 1])}
            key={i}
          />
        ))}
      </Box>

      <Box
        top="calc(50% - 20px)"
        position="absolute"
        background="white"
        borderRadius="30px"
        width="40px"
        height="40px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        userSelect="none"
        cursor="pointer"
        fontWeight="bold"
        fontSize="18px"
        zIndex={2}
        left="10px"
        transform="scale(-1)"
        onClick={() => paginate(-1)}>
        {"‣"}
      </Box>
      <Box
        top="calc(50% - 20px)"
        position="absolute"
        background="white"
        borderRadius="30px"
        width="40px"
        height="40px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        userSelect="none"
        cursor="pointer"
        fontWeight="bold"
        fontSize="18px"
        zIndex={2}
        right="10px"
        onClick={() => paginate(1)}>
        {"‣"}
      </Box>
    </Box>
  );
};

export default imageSlider;
