import queryString from "query-string"
import { Item, ItemDetailed, Rating, RatingQuery, SellerLocation, ShopDetailed, Sort } from "../types"

interface SearchQuery {
  by?: Sort
  keyword: string
  limit?: string
  locations?: SellerLocation
  newest?: string
  minPrice?: string
  maxPrice?: string
  order?: string
  matchId?: string // Category Id
}

export const searchAPI = async (query: SearchQuery) => {
  const stringQuery = queryString.stringify(query)

  const response = await fetch(`/api/v2/search/?${stringQuery}`)
  const items = await response.json()

  return items as Item[]
}

export const getItem = async ({ itemid, shopid }: { itemid: number; shopid: number }) => {
  const stringQuery = queryString.stringify({ itemid, shopid })

  const response = await fetch(`/api/v2/item/get/?${stringQuery}`)
  const items = await response.json()

  return items as ItemDetailed
}

export const getItemRating = async (ratingQuery: RatingQuery) => {
  const stringQuery = queryString.stringify(ratingQuery)

  const response = await fetch(`/api/v2/item/get/?${stringQuery}`)
  const items = await response.json()

  return items as Rating[]
}

export const getShop = async ({ shopid }: { shopid: number }) => {
  const stringQuery = queryString.stringify({ shopid })

  const response = await fetch(`/api/v4/shop/get_shop_detail/?${stringQuery}`)
  const items = await response.json()

  return items as ShopDetailed
}
