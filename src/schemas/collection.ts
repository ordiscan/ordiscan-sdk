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
