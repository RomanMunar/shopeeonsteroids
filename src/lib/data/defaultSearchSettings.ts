import { CompareLayout } from "src/slices/ui/UISlice";
import { SellerLocation, SearchSort } from "../types";

export interface Settings {
  filterPanelCollapsed: boolean;
  compareLayout: CompareLayout;
  sellerLocation: SellerLocation[];
  searchSort: SearchSort;
  itemRatingOnly: 2 | 3 | 4 | 5;
  shopeeVerifiedOnly: boolean;
  lastActive: number;
}

export const defaultSettings: Settings = {
  filterPanelCollapsed: false,
  compareLayout: "double",
  searchSort: "sales",
  sellerLocation: ["Metro Manila"],
  itemRatingOnly: 4,
  shopeeVerifiedOnly: false,
  lastActive: 3,
};
