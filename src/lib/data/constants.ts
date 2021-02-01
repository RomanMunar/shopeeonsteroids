import { CompareLayout } from "src/slices/ui/UISlice";
import { SearchSort, SellerLocation } from "../types";

export const searchItemLimitPerPage = 30;
export const itemRating = [2, 3, 4, 5] as [2, 3, 4, 5];
export const lastActiveDays = [2, 3, 4];
export const searchSort: SearchSort[] = ["relevancy", "latest", "price", "sales"];
export const compareLayouts: CompareLayout[] = ["double", "triple"];
export const locations: SellerLocation[] = [
  "Metro Manila",
  "South Luzon",
  "North Luzon",
  "Visayas",
  "Mindanao",
];
