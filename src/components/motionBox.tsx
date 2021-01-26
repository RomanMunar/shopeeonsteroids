import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

const motionBox = motion.custom(
  // eslint-disable-next-line
  forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    return <Box ref={ref} {...props} />;
  })
);

export default motionBox;
