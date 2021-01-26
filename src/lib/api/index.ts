import queryString from "query-string";
import { Item, ItemDetailed, Rating, RatingQuery, SearchQuery, ShopDetailed } from "../types";

export const searchAPI = async (query: SearchQuery) => {
  const stringQuery = queryString.stringify(query);
  const response = await fetch(`/api/v2/search/?${stringQuery}`);

  const items: Item[] = await response.json();

  return items;
};

export const getItem = async ({ itemid, shopid }: { itemid: number; shopid: number }) => {
  const stringQuery = queryString.stringify({ itemid, shopid });

  const response = await fetch(`/api/v2/item/get/?${stringQuery}`);
  const items: ItemDetailed = await response.json();

  return items;
};

export const getItemRating = async (ratingQuery: RatingQuery) => {
  const stringQuery = queryString.stringify(ratingQuery);

  const response = await fetch(`/api/v2/item/get_rating/?${stringQuery}`);
  const items: Rating[] = await response.json();

  return items;
};

export const getShopBrief = async (ratingQuery: RatingQuery) => {
  const stringQuery = queryString.stringify(ratingQuery);

  const response = await fetch(`/api/v2/shop/?${stringQuery}`);
  const items: Rating[] = await response.json();

  return items;
};

export const getShop = async ({ shopid }: { shopid: number }) => {
  const stringQuery = queryString.stringify({ shopid });

  const response = await fetch(`/api/v4/shop/get_shop_detail/?${stringQuery}`);
  const items: ShopDetailed = await response.json();

  return items;
};
