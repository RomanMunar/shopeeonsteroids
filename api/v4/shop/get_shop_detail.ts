import queryString from "query-string";
import { NowRequest, NowResponse } from "@vercel/node";
import { ShopeeShopDetailResponse } from "../../../src/lib/types/Api";

export default async (req: NowRequest, res: NowResponse) => {
  const { shopid } = req.query;

  if (!shopid) {
    return res.status(400).json({ error: true, message: "Must have shop id" });
  }

  try {
    const parsedQuery = queryString.stringify({ shopid });
    const response: ShopeeShopDetailResponse = await fetch(
      `https://shopee.ph/api/v4/get_shop_detail?${parsedQuery}`
    ).then((res) => res.json());

    const { data, error, error_msg } = response;

    const newData = {
      last_active_time: data.last_active_time,
      is_shopee_verified: data.is_shopee_verified,
      is_official_shop: data.is_official_shop,
      cover: data.cover,
      rating_normal: data.rating_normal,
      rating_bad: data.rating_bad,
      rating_good: data.rating_good,
      shop_covers: data.shop_covers,
      description: data.description,
      preparation_time: data.preparation_time,
      cancellation_rate: data.cancellation_rate,
      vacation: data.vacation,
      show_low_fulfillment_warning: data.show_low_fulfillment_warning,
      shop_location: data.shop_location,
      rating_star: data.rating_star,
      userid: data.userid,
      shopid: data.shopid,
      name: data.name,
      item_count: data.item_count,
      follower_count: data.follower_count,
      response_rate: data.response_rate,
      response_time: data.response_time,
      account: {
        username: data.account.username,
        following_count: data.account.following_count,
        portrait: data.account.portrait,
        total_avg_star: data.account.total_avg_star,
      },
    };

    return res.status(200).json({ data: newData, error, error_msg });
  } catch (err) {
    return res.status(500).json({ error_msg: "error", error: true });
  }
};
