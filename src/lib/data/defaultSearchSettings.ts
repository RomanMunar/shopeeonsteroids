import { CompareLayout } from "src/slices/ui/UISlice";
import { SellerLocation, SearchSort } from "../types";

export interface Settings {
  ui: {
    filterPanelCollapsed: boolean;
    compareLayout: CompareLayout;
  };
  search: {
    sellerLocation: SellerLocation[];
    searchSort: SearchSort;
    itemRatingOnly: 2 | 3 | 4 | 5;
    shopeeVerifiedOnly: boolean;
  };
  seller: {
    lastActive: number;
  };
}

export const defaultSettings: Settings = {
  ui: {
    filterPanelCollapsed: false,
    compareLayout: "double",
  },
  search: {
    searchSort: "sales",
    sellerLocation: ["Metro Manila", "Mindanao", "North Luzon", "South Luzon", "Visayas"],
    itemRatingOnly: 4,
    shopeeVerifiedOnly: false,
  },
  seller: {
    lastActive: 3,
  },
};
