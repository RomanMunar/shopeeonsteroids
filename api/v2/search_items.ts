import queryString from "query-string";
import { NowRequest, NowResponse } from "@vercel/node";
import fetch from "node-fetch";
import { SellerLocation, SearchSort } from "../../src/lib/types";
import { SearchResponse } from "../../src/lib/types/Api";
// Already validated query from the client side,
// but feel free to submit a pr, for revalidating these queries :)
export default async (req: NowRequest, res: NowResponse) => {
  const query = req.query as {
    locations: SellerLocation;
    by: SearchSort;
    keyword: string;
    limit: string;
    newest: string; // limit * page == newest, like offset
    order: string;
    price_min: string;
    price_max: string;
    match_id: string;
    rating_filter: string;
    pay_cod: string;
    shopee_verified: string;
  };
  if (!query.keyword) {
    return res.status(400).json({ error: true, message: "Must have keyword" });
  }

  const parsedQuery = queryString.stringify(query);

  try {
    const data: SearchResponse = await fetch(
      `https://shopee.ph/api/v2/search_items/?${parsedQuery}&page_type=search&skip_autocorrect=1&version=2`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "if-none-match-": "55b03-28973ef21cfd832b5433b48bb7d49c51",
        },
      }
    ).then((res) => res.json());

    if (data.items === null) {
      return res.status(400).json({ error_msg: "No Data found" });
    }

    const { error, error_msg, items } = data;
    const newItems = items.map((item) => ({
      has_lowest_price_guarantee: item.has_lowest_price_guarantee,
      itemid: item.itemid,
      name: item.name,
      adsid: item.adsid,
      brand: item.brand,
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
      shopee_verified: item.shopee_verified,
      shopid: item.shopid,
      shop_location: item.shop_location,
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
    }));

    res.status(200).json({
      error,
      error_msg,
      items: newItems,
    });
  } catch (e) {
    console.error("Engk! " + e.message);
    res.status(500).send("Error");
  }
};
