import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "src/lib/api";
import { ItemDetailed } from "src/lib/types";

interface ItemState {
  item: ItemDetailed;
  fetchStatus: "fulfilled" | "pending" | "idle";
  error: string | null | boolean;
}

export const fetchDisplayDetailedItem = createAsyncThunk<
  ItemDetailed,
  { itemid: number; shopid: number },
  { rejectValue: string }
>("item/fetchDisplayDetailedItem", async (data, { rejectWithValue, dispatch }) => {
  const { itemid, shopid } = data;

  dispatch(itemStart());

  try {
    return await getItem({ itemid, shopid });
  } catch (err) {
    return rejectWithValue("Error");
  }
});
const initialState: ItemState = {
  item: {
    has_lowest_price_guarantee: true,
    itemid: 6539310796,
    name:
      "【Noise Cancelling Microphone&Headphone】New Upgrade online class headset noise cancellation mic with Dual 3.5mm port and built-in noise reduction headphones",
    description:
      "\ud83c\udf3f[ PLEASE BE GUIDED ]\nExperience the convenience of Shopping from your Comfort Zone... We offer Safe and Hassle free in shopping your favorite stuffs.. be informed with our tips and advise in shopping for your own reference ^_^\n\n\ud83c\udf3f[ REMINDER ]\nAll of our products are brand new and sealed properly before packing and shipped out. If any damage or defect of items after delivered, please contact us via Chat for replacement or any possible solutions.\n\nWaterbased Oil is a water soluble scents for the units (Eco air purifiers and Eco Diffusers).\n\nWater based are water soluble scents for purifier, humidifier and atomizer\n\nMore Fragrances to follow\n\n**Air Purifier, Humidifier, and Diffusers are SOLD Separately.\n\n\ud83c\udf3f[ REVIEWS ] - Please kindly leave us a positive feedback (5 stars)  if you are satisfied with our items. Thanks!\n\n\n#ecohumidifier #ecofriendly #nanohumidifier #ecohumidifier #waterbasedoil\n\n#natural #ecoloveph #ecolovehandcraftedsoaps #myECOexperience #ecofriendly #handcrafted",
    historical_sold: 213123,
    models: [],
    brand: "No Brand",
    image: "c64b792e4163a401233d483d6fe55efa",
    images: [
      "c64b792e4163a401233d483d6fe55efa",
      "d99f8b6b86a20557aa12876404ecf4c2",
      "c7de1b9bd3688d6647ed704e3d75bb44",
      "1100512d6bf48f1360801fd04a23c87a",
      "c9cd90eb2e846c2953816eeff5550c5f",
      "aff4a7ea8b9d11cb228b8dae5d577371",
      "c2cbe8b4fdfe31b5583f1943f2cef992",
      "43097c1f0bf98ce025135eb78b804a86",
      "d3469b08df904e91e17b835561dd90d9",
    ],
    item_rating: {
      rating_count: [11503, 115, 54, 219, 898, 10217],
      rating_star: 4.830261,
      rcount_with_context: 3853,
      rcount_with_image: 2369,
    },
    price_min: 24000000,
    price_max: 66900000,
    price: 24000000,
    sold: 3443,
    shopee_verified: true,
    shopid: 181860033,
    shop_location: "Overseas",
    tier_variations: [
      {
        images: [
          "558ae7630c7207f045febfd7ad92745f",
          "76ca44b377c44b505a3e5c20ed152b2d",
          "28ab2fd9eaba0c7069bbed7074526f29",
          "91aca3db6b3aa56c57f500829ec24d15",
          "2252e4de59d4026fc554051a63d3f106",
          "b576ca60a5da046de54b40e28cac3b41",
          "ca51c54a1954659e81b14e60e9ecc631",
          "5d5750297cbfc30def165f57fbe52d57",
        ],
        name: "Type",
        options: [
          "Noise Reduction Mic",
          "Grey（Dual 3.5MM）",
          "Grey（Single 3.5MM)",
          "White(Dual 3.5mm）",
          "Gold(Dual 3.5mm）",
          "Gold（Single 3.5MM）",
          "Headset stand Black",
          "Headset stand White",
        ],
      },
    ],
    liked_count: 8072,
    is_adult: false,
    raw_discount: 86,
  },
  fetchStatus: "idle",
  error: null,
};

const itemShopee = createSlice({
  name: "item",
  initialState,
  reducers: {
    itemStart(state) {
      state.fetchStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDisplayDetailedItem.fulfilled, (state, { payload: item }) => {
      //remove past
      state.item = item;
      state.fetchStatus = "fulfilled";
      state.error = null;
    });
    builder.addCase(fetchDisplayDetailedItem.pending, (state) => {
      state.fetchStatus = "pending";
    });
    builder.addCase(fetchDisplayDetailedItem.rejected, (state, { payload }) => {
      state.fetchStatus = "fulfilled";
      if (payload) {
        state.error = payload;
      } else {
        state.error = true;
      }
    });
  },
});

export const { itemStart } = itemShopee.actions;
export default itemShopee.reducer;
