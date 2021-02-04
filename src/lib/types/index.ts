import { ReactNode } from "react";
import { SelectedItem } from "src/slices";
import { SelectedItemDetailed } from "src/slices/selectedItems/selectedItemsSlice";

export interface Item {
  has_lowest_price_guarantee: boolean;
  raw_discount: number;
  is_adult: boolean;
  image: string;
  images: string[];
  item_rating: ItemRating;
  itemid: number;
  name: string;
  price_max: number;
  price_min: number;
  price: number;
  shop_location: string;
  shopee_verified: boolean;
  shopid: number;
  sold: number;
  tier_variations: Tier[];
  liked_count: number;
  brand: string | null;
}

export interface ItemRating {
  rating_star: number;
  rating_count: number[];
  rcount_with_context: number;
  rcount_with_image: number;
}

export interface ItemRatingSummary {
  rating_total: number;
  rcount_with_context: number;
  rcount_with_image: number;
  rcount_with_media: number;
}

export interface Rating {
  anonymous: boolean;
  author_portrait: string;
  author_username: string;
  comment: string;
  images: string[];
  rating_star: number;
  product_items: { modelname: string };
  tags: [{ description: string }];
}

interface ShopCover {
  image_url: string;
  redirect_url: string;
  redirect_url_type: 3;
}

export interface ShopBrief {
  account: { portrait: string; total_avg_star: number };
  name: string;
  follower_count: number;
  response_rate: number;
  response_time: number;
  last_active_time: number;
}

export interface ShopDetailed {
  last_active_time: number;
  is_shopee_verified: boolean;
  is_official_shop: true;
  cover: string;
  rating_normal: number;
  rating_bad: number;
  rating_good: number;
  shop_covers: ShopCover[];
  description: string;
  preparation_time: number;
  cancellation_rate: number;
  vacation: boolean;
  show_low_fulfillment_warning: boolean;
  shop_location: string;
  rating_star: number;
  userid: number;
  shopid: number;
  name: string;
  item_count: number;
  follower_count: number;
  response_rate: number;
  response_time: number;
  account: {
    username: string;
    following_count: number;
    portrait: string;
    total_avg_star: number;
  };
}

export interface ItemDetailed extends Item {
  historical_sold: number;
  description: string;
  models: Model[];
}

export type Model = {
  price: number;
  name: string;
  tier_index: [number, number];
  stock: number;
  sold: number;
};

interface Tier {
  images: string[];
  name: string;
  options: string[];
}

export interface SearchItem extends Item {
  adsid: number | null;
}

export type SellerLocation =
  | "Metro Manila"
  | "South Luzon"
  | "North Luzon"
  | "Visayas"
  | "Mindanao";

export type SearchSort = "relevancy" | "price" | "latest" | "sales";

export interface SearchQuery {
  keyword: string;
  newest: number;
  price_min?: number;
  price_max?: number;
  order: "asc" | "desc"; //SearchSort
  by: SearchSort;
  limit: number;
  locations: SellerLocation[];
  match_id?: number; // Category Id
  rating_filter: number;
  pay_cod: number;
  shopee_verified: number;
}

export interface RatingQuery {
  itemid: number;
  shopid: number;
  offset: number;
  type: number;
  filter: number;
  limit: number;
}

export interface BookmarkItem {
  id: number;
  favorite: boolean;
  title: string;
  description: string;
  items: (SelectedItem | SelectedItemDetailed)[];
}

export interface Guide {
  id: number;
  title: string;
  description: string;
  body: ReactNode;
}
