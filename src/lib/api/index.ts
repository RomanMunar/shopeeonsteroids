import queryString from "query-string";
import { filterByUniqueField } from "src/lib/utils";
import { RatingQuery, SearchQuery } from "../types";
import {
  SearchResponse,
  ShopeeItemDetailResponse,
  ShopeeRatingResponse,
  ShopeeShopBriefResponse,
  ShopeeShopDetailResponse,
} from "../types/Api";

export const searchAPI = async (query: SearchQuery) => {
  const stringQuery = queryString.stringify(query);
  const response = await fetch(`/api/v2/search/?${stringQuery}`);

  const { items, error } = (await response.json()) as SearchResponse;
  if (error) {
    throw new Error("Error on searchApi");
  }

  return filterByUniqueField(items, "itemid");
};

export const getItem = async ({ itemid, shopid }: { itemid: number; shopid: number }) => {
  const stringQuery = queryString.stringify({ itemid, shopid });
  const response = await fetch(`/api/v2/item/get/?${stringQuery}`);

  const { item, error } = (await response.json()) as ShopeeItemDetailResponse;
  if (error) {
    throw new Error("Error on searchApi");
  }

  return item;
};

export const getRatings = async (ratingQuery: RatingQuery) => {
  const stringQuery = queryString.stringify(ratingQuery);

  const response = await fetch(`/api/v2/item/get_rating/?${stringQuery}`);
  const { data, error } = (await response.json()) as ShopeeRatingResponse;
  if (error) {
    throw new Error("Error on searchApi");
  }
  return data.ratings;
};

export const getShopBrief = async ({ itemid, shopid }: { itemid: number; shopid: number }) => {
  const stringQuery = queryString.stringify({ itemid, shopid });

  const response = await fetch(`/api/v2/shop/get/?${stringQuery}`);
  const { data, error } = (await response.json()) as ShopeeShopBriefResponse;
  if (error) {
    throw new Error("Error on searchApi");
  }
  return data;
};

export const getShop = async ({ shopid }: { shopid: number }) => {
  const stringQuery = queryString.stringify({ shopid });

  const response = await fetch(`/api/v4/shop/get_shop_detail/?${stringQuery}`);
  const { data } = (await response.json()) as ShopeeShopDetailResponse;

  return data;
};
