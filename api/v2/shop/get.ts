import { NowRequest, NowResponse } from "@vercel/node";
import fetch from "node-fetch";
import { shopeeUrlV2 } from "../../../constants";
import { ShopeeShopBriefResponse } from "../../../src/lib/types/Api";
export default async (req: NowRequest, res: NowResponse) => {
  const { shopid } = req.query;
  try {
    const response: ShopeeShopBriefResponse = await fetch(
      `${shopeeUrlV2}/shop/get?is_brief=1&shopid=${shopid}`
    ).then((res) => res.json());
    const { data, error, error_msg } = response;
    const newData = {
      account: {
        portrait: data.account.portrait,
        total_avg_star: data.account.total_avg_star,
      },
      name: data.name,
      follower_count: data.follower_count,
      response_rate: data.response_rate,
      response_time: data.response_time,
      last_active_time: data.last_active_time,
    };

    res.status(200).json({ data: newData, error, error_msg });
  } catch (e) {
    console.error("Engk! " + e.message);
    res.status(500).send("Error");
  }
};
