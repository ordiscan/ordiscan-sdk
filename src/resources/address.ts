import { Ordiscan } from "../client";
import { Inscription } from "./inscription";
import { Satribute } from "./sat";
import { Brc20Activity, InscriptionActivity, RunicTx } from "./tx";

export interface RuneBalance {
  name: string;
  balance: string;
}

export interface Brc20Balance {
  tick: string;
  balance: number;
}

export interface SatributeBalance {
  satributes: Satribute[];
  ranges: [number, number][];
}

export class Address {
  constructor(
    private readonly client: Ordiscan,
    private readonly address: string,
  ) {}

  async inscriptions({ page }: { page?: number } = {}) {
    let url = `/address/${this.address}/inscriptions`;

    if (page) {
      url += `?page=${page}`;
    }

    return this.client.fetch<Inscription[]>(url);
  }

  async runes() {
    return this.client.fetch<RuneBalance[]>(`/address/${this.address}/runes`);
  }

  async brc20() {
    return this.client.fetch<Brc20Balance[]>(`/address/${this.address}/brc20`);
  }

  async rareSats() {
    return this.client.fetch<SatributeBalance[]>(
      `/address/${this.address}/rare-sats`,
    );
  }

  async inscriptionActivity({
    type,
    page,
  }: { type?: "transfer" | "inscribe"; page?: number } = {}) {
    let url = `/address/${this.address}/activity`;

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

  async runesActivity({
    page,
    sort,
  }: {
    page?: number;
    sort?: "oldest" | "newest";
  } = {}) {
    let url = `/address/${this.address}/activity/runes`;

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

  async brc20Activity({
    page,
    sort,
  }: {
    page?: number;
    sort?: "oldest" | "newest";
  } = {}) {
    let url = `/address/${this.address}/activity/brc20`;

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
