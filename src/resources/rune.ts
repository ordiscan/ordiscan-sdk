import { BaseResource } from "./base";

export interface RuneInfo {
  id: string;
  name: string;
  formatted_name: string;
  spacers: number;
  number: number;
  inscription_id: string | null;
  decimals: number;
  mint_count_cap: string;
  symbol: string;
  etching_txid: string | null;
  amount_per_mint: string;
  timestamp_unix: string | null;
  premined_supply: string;
  mint_start_block: number;
  mint_end_block: number;

  // TODO: these don't exist in list
  current_supply: string;
  current_mint_count: number;
}

export interface RuneMarketInfo {
  price_in_sats: number;
  price_in_usd: number;
  market_cap_in_btc: number;
  market_cap_in_usd: number;
}

export interface RuneName {
  name: string;
  status: "ETCHED" | "AVAILABLE" | "LOCKED" | "RESERVED";
  unlock_block_height: number;
  unlock_block_timestamp: string;
}

export class RuneResource extends BaseResource {
  async list({
    sort,
    after,
    before,
  }: {
    sort?: "newest" | "oldest";
    after?: number;
    before?: number;
  } = {}): Promise<RuneInfo[]> {
    const params = new URLSearchParams();

    if (sort) {
      params.append("sort", sort);
    }

    if (before !== undefined) {
      params.append("before", before.toString());
    }

    if (after !== undefined) {
      params.append("after", after.toString());
    }

    return this.client.fetch<RuneInfo[]>(`/runes?${params.toString()}`);
  }

  async getInfo({ name }: { name: string }) {
    return this.client.fetch<RuneInfo>(`/rune/${name}`);
  }

  async getMarketInfo({ name }: { name: string }) {
    return this.client.fetch<RuneMarketInfo>(`/rune/${name}/market`);
  }

  async getUnlockDate({ name }: { name: string }) {
    return this.client.fetch<RuneName>(`/rune-name/${name}`);
  }
}
