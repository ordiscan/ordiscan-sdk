import { z } from "zod";

export const TxInfoSchema = z.object({
  txid: z.string(),
  fee: z.number(),
  size: z.number(),
  weight: z.number(),
  confirmed: z.boolean(),
  block_hash: z.string(),
  indexed: z.boolean(),
  has_inscriptions: z.boolean(),
  has_inscription_transfers: z.boolean(),
  has_runes: z.boolean(),
});

export type TxInfo = z.infer<typeof TxInfoSchema>;
