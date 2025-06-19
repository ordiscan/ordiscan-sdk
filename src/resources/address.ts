import { BaseResource } from "@/resources/base";

import { AlkaneBalance, AlkaneUtxo } from "@/schemas/alkane";
import { Brc20Activity, Brc20Balance } from "@/schemas/brc20";
import { Inscription } from "@/schemas/inscription";
import { InscriptionActivity } from "@/schemas/inscriptionTx";
import { RuneBalance } from "@/schemas/rune";
import { RunicTx } from "@/schemas/runicTx";
import { RareSatBalance } from "@/schemas/sat";
import { Utxo } from "@/schemas/utxo";

export class AddressResource extends BaseResource {
  async getUtxos({ address }: { address: string }) {
    return this.client.fetch<Utxo[]>(`/address/${address}/utxos`);
  }

  async getInscriptionIds({ address }: { address: string }) {
    let url = `/address/${address}/inscription-ids`;

    return this.client.fetch<string[]>(url);
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
    return this.client.fetch<RareSatBalance[]>(`/address/${address}/rare-sats`);
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

  async getAlkanes({ address }: { address: string }) {
    return this.client.fetch<AlkaneBalance[]>(`/address/${address}/alkanes`);
  }

  async getAlkaneUtxos({ address }: { address: string }) {
    return this.client.fetch<AlkaneUtxo[]>(`/address/${address}/utxos/alkanes`);
  }
}
