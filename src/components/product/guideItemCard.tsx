import { Box, Text } from "@chakra-ui/react";
import { Guide } from "src/lib/types";

interface Props {
  guide: Guide;
  active: boolean;
  previewGuide: (guide: Guide) => void;
}

const guideItemCard = ({ guide, active, previewGuide }: Props) => {
  return (
    <Box
      bg={active ? "blue.50" : "gray.50"}
      w="full"
      p="2"
      borderLeft="4px"
      borderColor={active ? "blue.300" : "transparent"}
      onClick={() => previewGuide(guide)}>
      <Text fontWeight="bold">{guide.title}</Text>
      <Text fontSize="sm">{guide.description}</Text>
    </Box>
  );
};

export default guideItemCard;
