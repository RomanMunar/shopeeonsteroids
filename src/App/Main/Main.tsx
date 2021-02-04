import { Flex } from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Guide } from "src/lib/types";
import { toggleGuidesPanel } from "src/slices/ui/UISlice";
import { RootState } from "../rootReducer";
import { GuidePreviewPanel } from "./GuidePreviewPanel";
import { HowToBookmark, HowToUseCompare, HowToUseSearch, IdealWorkflow } from "./guides";
import { GuidesPanel } from "./GuidesPanel";

const Main = () => {
  const dispatch = useDispatch();
  const guides = [IdealWorkflow, HowToUseSearch, HowToBookmark, HowToUseCompare];
  const [displayedGuide, previewGuide] = useState<Guide>(guides[0]);
  const [searchResults, setSearchResults] = useState<Guide[]>([]);

  const { isGuidesPanelCollapsed } = useSelector((state: RootState) => state.UIReducer);
  const toggleGuidesCollapse = () => dispatch(toggleGuidesPanel());

  const fuse = new Fuse(guides, {
    keys: [
      { name: "title", weight: 3 }, // will be assigned a `weight` of 1
      { name: "description", weight: 3 },
      { name: "items.name", weight: 1 },
    ],
  });
  const searchGuides = (keyword: string) => {
    const searchResult = fuse.search(keyword).map((r) => r.item);
    setSearchResults(searchResult);
  };

  return (
    <Flex flexDirection="row" overflow="hidden" h="100vh">
      <GuidesPanel
        collapsed={isGuidesPanelCollapsed}
        toggleCollapse={toggleGuidesCollapse}
        previewGuide={previewGuide}
        searchGuides={searchGuides}
        guides={searchResults.length > 0 ? searchResults : guides}
        displayedGuide={displayedGuide}
      />
      <GuidePreviewPanel displayedGuide={displayedGuide} />
    </Flex>
  );
};

export default Main;
