import { NowRequest, NowResponse } from "@vercel/node";
import queryString from "query-string";
import { shopeeUrlV2 } from "../../../constants";
import { ShopeeItemDetailResponse } from "../../../src/lib/types/Api";

export default async (req: NowRequest, res: NowResponse) => {
  const { itemid, shopid } = req.query;

  if (!itemid || !shopid) {
    return res.status(400).json({ error: true, message: "Must have shop and item ids" });
  }

  try {
    const parsedQuery = queryString.stringify({ itemid, shopid });
    const response: ShopeeItemDetailResponse = await fetch(
      `${shopeeUrlV2}get?${parsedQuery}`
    ).then((res) => res.json());

    const { item, error, error_msg } = response;
    const newData = {
      has_lowest_price_guarantee: item.has_lowest_price_guarantee,
      tier_variations: item.tier_variations.map((tier) => {
        return {
          images: tier.images,
          name: tier.name,
          options: tier.options,
        };
      }),
      liked_count: item.liked_count,
      is_adult: item.is_adult,
      raw_discount: item.raw_discount,
      itemid: item.itemid,
      shopid: item.shopid,
      description: item.description,
      brand: item.brand,
      name: item.name,
      image: item.image,
      images: item.images,
      item_rating: {
        rating_count: item.item_rating.rating_count,
        rating_star: item.item_rating.rating_star,
        rcount_with_context: item.item_rating.rcount_with_context,
        rcount_with_image: item.item_rating.rcount_with_image,
      },
      price_min: item.price_min,
      price_max: item.price_max,
      price: item.price,
      sold: item.sold,
      historical_sold: item.historical_sold,
      shopee_verified: item.shopee_verified,
      shop_location: item.shop_location,
      models: item.models.map((m) => {
        return {
          price: m.price,
          tier_index: m.tier_index,
          name: m.name,
          stock: m.stock,
          sold: m.sold,
        };
      }),
    };

    res.status(200).json({ data: newData, error, error_msg });
  } catch (e) {
    console.error("Engk! " + e.message);
    res.status(500).send("Error");
  }
};
