import { z } from "zod";

// When getting a list of alkanes:
export const AlkaneBaseSchema = z
  .object({
    id: z.string(),
    name: z.string().nullable(),
    symbol: z.string().nullable(),
    type: z.enum(["TOKEN", "CONTRACT", "NFT_COLLECTION", "NFT_ITEM"]),
    premined_supply: z.string(),
    amount_per_mint: z.string().nullable(),
    mint_count_cap: z.string().nullable(),
    deploy_txid: z.string().nullable(),
    deploy_timestamp: z.string().nullable(),
    deploy_block_height: z.number().nullable(),
    deploy_block_hash: z.string().nullable(),
    resource_number: z.number().nullable(),
  })
  .strict();

export type Alkane = z.infer<typeof AlkaneBaseSchema>;

// When getting a specific alkane:
export const AlkaneWithSupplySchema = AlkaneBaseSchema.extend({
  current_supply: z.string(),
  current_mint_count: z.number(),
});

export type AlkaneWithSupply = z.infer<typeof AlkaneWithSupplySchema>;