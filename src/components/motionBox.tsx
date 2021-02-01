import { motion, isValidMotionProp } from "framer-motion";
import { forwardRef } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

const motionBox = motion.custom(
  // eslint-disable-next-line
  forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
);

export default motionBox;
