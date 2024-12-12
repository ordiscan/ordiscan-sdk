import { z } from "zod";
import { BaseResource } from "./base";

// When getting a list of runes:
export const RuneBaseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    formatted_name: z.string(),
    spacers: z.number(),
    number: z.number(),
    inscription_id: z.string().nullable(),
    decimals: z.number(),
    mint_count_cap: z.string(),
    symbol: z.string().nullable(),
    etching_txid: z.string().nullable(),
    amount_per_mint: z.string(),
    timestamp_unix: z.string().nullable(),
    premined_supply: z.string(),
    mint_start_block: z.number().nullable(),
    mint_end_block: z.number().nullable(),
  })
  .strict();

export type Rune = z.infer<typeof RuneBaseSchema>;

// When getting a specific rune:
export const RuneWithSupplySchema = RuneBaseSchema.extend({
  current_supply: z.string(),
  current_mint_count: z.number(),
});

export type RuneWithSupply = z.infer<typeof RuneWithSupplySchema>;

export const RuneMarketInfoSchema = z
  .object({
    price_in_sats: z.number(),
    price_in_usd: z.number(),
    market_cap_in_btc: z.number(),
    market_cap_in_usd: z.number(),
  })
  .strict();

export type RuneMarketInfo = z.infer<typeof RuneMarketInfoSchema>;

export const RuneNameSchema = z
  .object({
    name: z.string(),
    status: z.enum(["ETCHED", "AVAILABLE", "LOCKED", "RESERVED"]),
    unlock_block_height: z.number(),
    unlock_block_timestamp: z.string(),
  })
  .strict();

export type RuneName = z.infer<typeof RuneNameSchema>;

export class RuneResource extends BaseResource {
  async list({
    sort,
    after,
    before,
  }: {
    sort?: "newest" | "oldest";
    after?: number;
    before?: number;
  } = {}): Promise<Rune[]> {
    const params = new URLSearchParams();

    let url = "/runes";

    if (sort) {
      params.append("sort", sort);
    }

    if (before !== undefined) {
      params.append("before", before.toString());
    }

    if (after !== undefined) {
      params.append("after", after.toString());
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<Rune[]>(url);
  }

  async getInfo({ name }: { name: string }) {
    return this.client.fetch<Rune>(`/rune/${name}`);
  }

  async getMarketInfo({ name }: { name: string }) {
    return this.client.fetch<RuneMarketInfo>(`/rune/${name}/market`);
  }

  async getUnlockDate({ name }: { name: string }) {
    return this.client.fetch<RuneName>(`/rune-name/${name}`);
  }
}
