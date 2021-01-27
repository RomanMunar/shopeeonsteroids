import { createSlice } from "@reduxjs/toolkit";

export type CompareLayout = "double" | "triple" | "all";
export type ModalView = "itemDisplay" | "help" | "guide" | "bookmarkForm";
interface UIState {
  displayComparePanel: boolean;
  compareLayout: CompareLayout;
  isFilterPanelCollapsed: boolean;
  modalView: ModalView;
  displayModal: boolean;
}

const initialState: UIState = {
  displayComparePanel: false,
  isFilterPanelCollapsed: false,
  compareLayout: "double",
  modalView: "itemDisplay",
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
    allCompareLayout(state) {
      state.compareLayout = "all";
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleModal,
  showHelpModal,
  showGuideModal,
  showBookmarkFormModal,
  showItemDisplayModal,
  doubleCompareLayout,
  tripleCompareLayout,
  allCompareLayout,
  collapseFilterPanel,
  uncollapseFilterPanel,
  toggleFilterPanel,
  openComparePanel,
  closeComparePanel,
  toggleComparePanel,
} = UI.actions;
export default UI.reducer;
