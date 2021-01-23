import { Item, ItemDetailed, Rating, SearchItem, ShopDetailed } from "."

interface ShopeeResponse {
  data?: any | null
  error: number | string | null
  error_msg: string | null
}

export interface SearchResponse extends ShopeeResponse {
  items: SearchItem[]
}

export interface ShopeeRatingResponse extends ShopeeResponse {
  data: {
    item: Item
    ratings: Rating[]
  }
}

export interface ShopeeItemResponse extends ShopeeResponse {
  item: Item
}

export interface ShopeeItemDetailResponse extends ShopeeResponse {
  item: ItemDetailed
}

export interface ShopeeShopDetailResponse extends ShopeeResponse {
  data: ShopDetailed
}
