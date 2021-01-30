import faker from "faker";
import { createServer, Factory, Model } from "miragejs";
import { mockData } from "./App/Search/mockData";
import { mockItem } from "./App/Search/mockItemDetailed";
import { mockShopBrief } from "./App/Search/mockShopBrief";
import { Item, ItemRating, ShopBrief, ShopDetailed } from "./lib/types";

export const makeServer = ({ environment = "test" }) => {
  return createServer({
    environment,

    factories: {
      item: Factory.extend<Partial<Item>>({
        get has_lowest_price_guarantee() {
          return faker.random.boolean();
        },
        get raw_discount() {
          return faker.random.boolean() ? faker.random.number(95) : 0;
        },
        get is_adult() {
          return faker.random.boolean();
        },
        get image() {
          return faker.image.imageUrl(500, 500);
        },
        get images() {
          return Array(faker.random.number(5))
            .fill(0)
            .map(() => faker.image.imageUrl(500, 500));
        },
        get item_rating() {
          const ratingRand = [
            faker.random.number(100),
            faker.random.number(35),
            faker.random.number(20),
            faker.random.number(10),
            faker.random.number(10),
          ];
          const itemRating: ItemRating = {
            rating_count: ratingRand,
            rating_star: faker.random.float(5),
            rcount_with_context: faker.random.number(30),
            rcount_with_image: faker.random.number(20),
          };

          return itemRating;
        },
        get itemid() {
          return faker.random.number(10000);
        },
        get name() {
          return faker.internet.userName();
        },
        get price_max() {
          return faker.random.boolean() ? faker.random.number(40) * 100 : undefined;
        },
        get price_min() {
          return faker.random.boolean() ? faker.random.number(40) * 100 : undefined;
        },
        get price() {
          return faker.random.number(40) * 100;
        },
        get shop_location() {
          return faker.fake("{{address.city}}, {{address.stateAbbr}} {{address.zipCode}}");
        },
        get shopee_verified() {
          return faker.random.boolean();
        },
        get shopid() {
          return faker.random.number();
        },
        get sold() {
          return faker.random.number(80);
        },
        get tier_variations() {
          return faker.random.boolean()
            ? faker.random.boolean()
              ? Array(faker.random.number(5))
                  .fill(0)
                  .map(() => {
                    return {
                      images: Array(faker.random.number(5))
                        .fill(0)
                        .map(() => faker.image.imageUrl(500, 500)),
                      name: faker.commerce.productName(),
                      options: [
                        faker.commerce.productName(),
                        faker.commerce.productName(),
                        faker.commerce.productName(),
                      ],
                    };
                  })
              : undefined
            : undefined;
        },
        get liked_count() {
          return faker.random.number(50);
        },
        get brand() {
          return faker.random.boolean() ? faker.company.companyName() : undefined;
        },
      }),
    },

    models: {
      item: Model.extend<Partial<Item>>({}),
      item_rating: Model.extend<Partial<ItemRating>>({}),
      shop: Model.extend<Partial<ShopDetailed>>({}),
      shop_brief: Model.extend<Partial<ShopBrief>>({}),
    },

    routes() {
      this.namespace = "api";

      this.get("/v2/search", () => {
        return { items: mockData, error: false, error_msg: null };
      });

      this.get("/v2/item/get", () => {
        return { item: mockItem, error: false, error_msg: null };
      });

      this.get("/v2/item/get_rating", (schema) => {
        return schema.all("item");
      });

      this.get("/v2/shop", () => {
        return { data: mockShopBrief, error: false, error_msg: null };
      });
    },

    seeds(server) {
      server.createList("item", 20);
    },
  });
};
