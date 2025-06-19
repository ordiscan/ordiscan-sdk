import { z } from "zod";

export const BlockStatusSchema = z.object({
  runes_indexed: z.boolean(),
  inscriptions_indexed: z.boolean(),
});

export const BlockSchema = z.object({
  hash: z.string(),
  height: z.number(),
  timestamp: z.string(),
  size: z.number(),
  weight: z.number(),
  status: BlockStatusSchema,
});

export const RuneTxidsSchema = z.array(z.string());

export type BlockStatus = z.infer<typeof BlockStatusSchema>;
export type Block = z.infer<typeof BlockSchema>;
export type RuneTxids = z.infer<typeof RuneTxidsSchema>;