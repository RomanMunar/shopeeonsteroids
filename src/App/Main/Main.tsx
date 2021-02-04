import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Guide } from "src/lib/types";
import { toggleGuidesPanel } from "src/slices/ui/UISlice";
import { RootState } from "../rootReducer";
import { GuidePreviewPanel } from "./GuidePreviewPanel";
import { HowToBookmark, HowToUseCompare, HowToUseSearch } from "./guides";
import { GuidesPanel } from "./GuidesPanel";

const Main = () => {
  const dispatch = useDispatch();
  const guides = [HowToUseSearch, HowToBookmark, HowToUseCompare];
  const [displayedGuide, previewGuide] = useState<Guide>(guides[0]);
  const { isGuidesPanelCollapsed } = useSelector((state: RootState) => state.UIReducer);
  const toggleGuidesCollapse = () => dispatch(toggleGuidesPanel());

  return (
    <Flex flexDirection="row" overflow="hidden" h="100vh">
      <GuidesPanel
        collapsed={isGuidesPanelCollapsed}
        toggleCollapse={toggleGuidesCollapse}
        previewGuide={previewGuide}
        guides={guides}
        displayedGuide={displayedGuide}
      />
      <GuidePreviewPanel displayedGuide={displayedGuide} />
    </Flex>
  );
};

export default Main;
