import { z } from "zod";

export const ActivityCheckSchema = z.object({
  has_inscription_activity: z.boolean(),
  has_rune_activity: z.boolean(),
  has_brc20_activity: z.boolean(),
});

export type ActivityCheck = z.infer<typeof ActivityCheckSchema>;
