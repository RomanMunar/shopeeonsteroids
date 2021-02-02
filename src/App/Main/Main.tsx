import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Guide } from "src/lib/types";
import { GuidePreviewPanel } from "./GuidePreviewPanel";
import { HowToBookmark, HowToUseCompare, HowToUseSearch } from "./guides";
import { GuidesPanel } from "./GuidesPanel";
const Main = () => {
  const guides = [HowToUseSearch, HowToBookmark, HowToUseCompare];
  const [displayedGuide, previewGuide] = useState<Guide>(guides[0]);

  return (
    <Flex flexDirection="row" overflow="hidden" h="100vh">
      <GuidesPanel previewGuide={previewGuide} guides={guides} displayedGuide={displayedGuide} />
      <GuidePreviewPanel displayedGuide={displayedGuide} />
    </Flex>
  );
};

export default Main;
