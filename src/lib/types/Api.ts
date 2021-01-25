import { Item, ItemDetailed, Rating, SearchItem, ShopBrief, ShopDetailed } from ".";

interface ShopeeResponse {
  error: number | string | null;
  error_msg: string | null;
}

export interface SearchResponse extends ShopeeResponse {
  items: SearchItem[];
}

export interface ShopeeRatingResponse extends ShopeeResponse {
  data: {
    item: Item;
    ratings: Rating[];
  };
}

export interface ShopeeItemResponse extends ShopeeResponse {
  item: Item;
}

export interface ShopeeItemDetailResponse extends ShopeeResponse {
  item: ItemDetailed;
}

export interface ShopeeShopDetailResponse extends ShopeeResponse {
  data: ShopDetailed;
}

export interface ShopeeShopBriefResponse extends ShopeeResponse {
  data: ShopBrief;
}
