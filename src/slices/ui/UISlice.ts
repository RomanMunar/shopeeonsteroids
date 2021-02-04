import { createSlice } from "@reduxjs/toolkit";
import { getLocaleStorageSettings } from "src/lib/utils/localStorage";

export type CompareLayout = "double" | "triple";
export type ModalView = "itemDisplay" | "help" | "guide" | "bookmarkForm";
interface UIState {
  displayComparePanel: boolean;
  compareLayout: CompareLayout;
  isFilterPanelCollapsed: boolean;
  isSelectedItemsPanelCollapsed: boolean;
  isGuidesPanelCollapsed: boolean;
  isBookmarksPanelCollapsed: boolean;
  modalView: ModalView;
  displayModal: boolean;
}

const localSettings = getLocaleStorageSettings();

const initialState: UIState = {
  displayComparePanel: false,
  isFilterPanelCollapsed: localSettings.filterPanelCollapsed,
  isSelectedItemsPanelCollapsed: false,
  isGuidesPanelCollapsed: false,
  isBookmarksPanelCollapsed: false,
  compareLayout: localSettings.compareLayout,
  modalView: "bookmarkForm",
  displayModal: false,
};

export const UI = createSlice({
  name: "UI",
  initialState,
  reducers: {
    openModal(state) {
      state.displayModal = true;
    },
    closeModal(state) {
      state.displayModal = false;
    },
    toggleModal(state) {
      if (state.displayModal === true) {
        state.displayModal = false;
      } else {
        state.displayModal = true;
      }
    },
    openComparePanel(state) {
      state.displayComparePanel = true;
    },
    closeComparePanel(state) {
      state.displayComparePanel = false;
    },
    toggleComparePanel(state) {
      if (state.displayComparePanel === true) {
        state.displayComparePanel = false;
      } else {
        state.displayComparePanel = true;
      }
    },
    collapseFilterPanel(state) {
      state.isFilterPanelCollapsed = true;
    },
    uncollapseFilterPanel(state) {
      state.isFilterPanelCollapsed = false;
    },
    toggleFilterPanel(state) {
      if (state.isFilterPanelCollapsed === true) {
        state.isFilterPanelCollapsed = false;
      } else {
        state.isFilterPanelCollapsed = true;
      }
    },
    toggleBookmarksPanel(state) {
      if (state.isBookmarksPanelCollapsed === true) {
        state.isBookmarksPanelCollapsed = false;
      } else {
        state.isBookmarksPanelCollapsed = true;
      }
    },
    toggleGuidesPanel(state) {
      if (state.isGuidesPanelCollapsed === true) {
        state.isGuidesPanelCollapsed = false;
      } else {
        state.isGuidesPanelCollapsed = true;
      }
    },
    toggleSelectedItemsPanel(state) {
      if (state.isSelectedItemsPanelCollapsed === true) {
        state.isSelectedItemsPanelCollapsed = false;
      } else {
        state.isSelectedItemsPanelCollapsed = true;
      }
    },
    showHelpModal(state) {
      state.displayModal = true;
      state.modalView = "help";
    },
    showGuideModal(state) {
      state.displayModal = true;
      state.modalView = "guide";
    },
    showBookmarkFormModal(state) {
      state.displayModal = true;
      state.modalView = "bookmarkForm";
    },
    showItemDisplayModal(state) {
      state.displayModal = true;
      state.modalView = "itemDisplay";
    },
    doubleCompareLayout(state) {
      state.compareLayout = "double";
    },
    tripleCompareLayout(state) {
      state.compareLayout = "triple";
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleModal,
  toggleBookmarksPanel,
  toggleGuidesPanel,
  toggleSelectedItemsPanel,
  showHelpModal,
  showGuideModal,
  showBookmarkFormModal,
  showItemDisplayModal,
  doubleCompareLayout,
  tripleCompareLayout,
  collapseFilterPanel,
  uncollapseFilterPanel,
  toggleFilterPanel,
  openComparePanel,
  closeComparePanel,
  toggleComparePanel,
} = UI.actions;
export default UI.reducer;
