import { Ordiscan } from "../client";
import { Inscription } from "./inscriptions";
import { Satribute } from "./sats";
import {
  Brc20Activity,
  InscriptionActivity,
  InscriptionTransfer,
  RunicTx,
} from "./tx";

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

  async inscriptions() {
    return this.client.fetch<Inscription[]>(
      `/address/${this.address}/inscriptions`,
    );
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

  async inscriptionActivity() {
    return this.client.fetch<InscriptionActivity[]>(
      `/address/${this.address}/activity`,
    );
  }

  async runesActivity() {
    return this.client.fetch<RunicTx[]>(
      `/address/${this.address}/activity/runes`,
    );
  }

  async brc20Activity() {
    return this.client.fetch<Brc20Activity[]>(
      `/address/${this.address}/activity/brc20`,
    );
  }
}
