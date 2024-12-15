import { z } from "zod";

import { BaseResource } from "@/resources/base";
import { Inscription } from "@/resources/inscription";
import { SatributeSchema } from "@/resources/sat";
import { Brc20Activity, InscriptionActivity, RunicTx } from "@/resources/tx";

export const RuneBalanceSchema = z.object({
  name: z.string(),
  balance: z.string(),
});

export type RuneBalance = z.infer<typeof RuneBalanceSchema>;

export const Brc20BalanceSchema = z.object({
  tick: z.string(),
  balance: z.number(),
});

export type Brc20Balance = z.infer<typeof Brc20BalanceSchema>;

export const SatributeBalanceSchema = z.object({
  satributes: z.array(SatributeSchema),
  ranges: z.array(z.array(z.number())),
});

export type SatributeBalance = z.infer<typeof SatributeBalanceSchema>;

export const UtxoSchema = z.object({
  outpoint: z.string(),
  value: z.number(),
  runes: z.array(RuneBalanceSchema),
  inscriptions: z.array(z.string()),
});

export type Utxo = z.infer<typeof UtxoSchema>;

export class AddressResource extends BaseResource {
  async getUtxos({ address }: { address: string }) {
    return this.client.fetch<Utxo[]>(`/address/${address}/utxos`);
  }

  async getInscriptions({ address, page }: { address: string; page?: number }) {
    let url = `/address/${address}/inscriptions`;

    if (page) {
      url += `?page=${page}`;
    }

    return this.client.fetch<Inscription[]>(url);
  }

  async getRunes({ address }: { address: string }) {
    return this.client.fetch<RuneBalance[]>(`/address/${address}/runes`);
  }

  async getBrc20Tokens({ address }: { address: string }) {
    return this.client.fetch<Brc20Balance[]>(`/address/${address}/brc20`);
  }

  async getRareSats({ address }: { address: string }) {
    return this.client.fetch<SatributeBalance[]>(
      `/address/${address}/rare-sats`,
    );
  }

  async getInscriptionActivity({
    address,
    type,
    page,
  }: {
    address: string;
    type?: "transfer" | "inscribe";
    page?: number;
  }) {
    let url = `/address/${address}/activity`;

    const params = new URLSearchParams();

    if (type) {
      params.append("type", type);
    }

    if (page) {
      params.append("page", page.toString());
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<InscriptionActivity[]>(url);
  }

  async getRunesActivity({
    address,
    page,
    sort,
  }: {
    address: string;
    page?: number;
    sort?: "oldest" | "newest";
  }) {
    let url = `/address/${address}/activity/runes`;

    const params = new URLSearchParams();

    if (sort) {
      params.append("sort", sort);
    }

    if (page) {
      params.append("page", page.toString());
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<RunicTx[]>(url);
  }

  async getBrc20Activity({
    address,
    page,
    sort,
  }: {
    address: string;
    page?: number;
    sort?: "oldest" | "newest";
  }) {
    let url = `/address/${address}/activity/brc20`;

    const params = new URLSearchParams();

    if (sort) {
      params.append("sort", sort);
    }

    if (page) {
      params.append("page", page.toString());
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<Brc20Activity[]>(url);
  }
}
