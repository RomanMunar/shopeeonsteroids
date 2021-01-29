import { NowRequest, NowResponse } from "@vercel/node";
import queryString from "query-string";
import fetch from "node-fetch";
import { SellerLocation } from "../../../src/lib/types";
import { ShopeeRatingResponse } from "../../../src/lib/types/Api";
import { shopeeUrlV2 } from "../../../constants";

export default async (req: NowRequest, res: NowResponse) => {
  const query = req.query as {
    itemid: string;
    shopid: SellerLocation;
    offset: string;
    type: string;
    filter: string;
    limit: string;
  };
  // &type=0 All
  // &type=5 5 stars only
  // &type=5 4 stars only
  //  ...
  // &filter=3 With Media
  // &filter=1 With Comments
  const parsedQuery = queryString.stringify(query);
  try {
    const response: ShopeeRatingResponse = await fetch(
      `${shopeeUrlV2}/item/get_ratings?flag=1&${parsedQuery}`
    ).then((res) => res.json());

    const { data, error, error_msg } = response;

    const newData = data.ratings.map((rating) => {
      return {
        anonymous: rating.anonymous,
        author_portrait: rating.author_portrait,
        author_username: rating.author_username,
        comment: rating.comment,
        images: rating.images,
        rating_star: rating.rating_star,
        product_items: { modelName: rating.product_items.modelname },
        tags: rating.tags,
      };
    });

    res.status(200).json({ data: newData, error, error_msg });
  } catch (e) {
    console.error("Engk! " + e.message);
    res.status(500).send("Error");
  }
};
