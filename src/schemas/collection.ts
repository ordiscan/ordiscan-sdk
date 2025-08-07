import { z } from "zod";

export const CollectionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  twitter_link: z.string().nullable(),
  discord_link: z.string().nullable(),
  website_link: z.string().nullable(),
  item_count: z.number(),
});

export type Collection = z.infer<typeof CollectionSchema>;

export const CollectionMarketInfoSchema = z.object({
  floor_price_in_sats: z.number().nullable(),
  floor_price_in_usd: z.number().nullable(),
  market_cap_in_btc: z.number().nullable(),
  market_cap_in_usd: z.number().nullable(),
});

export type CollectionMarketInfo = z.infer<typeof CollectionMarketInfoSchema>;
