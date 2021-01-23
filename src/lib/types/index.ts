export interface Item {
  has_lowest_price_guarantee: boolean
  raw_discount: number
  is_adult: boolean
  image: string
  images: string[]
  item_rating: ItemRating
  itemid: number
  name: string
  price_max: number
  price_min: number
  price: number
  shop_location: string
  shopee_verified: boolean
  shopid: number
  sold: number
  tier_variations: Tier[]
  liked_count: number
  brand: string | null
}

export interface ItemRating {
  rating_star: number
  rating_count: number[]
  rcount_with_context: number
  rcount_with_image: number
}

interface Tier {
  images: string[]
  name: string
  options: string[]
}
