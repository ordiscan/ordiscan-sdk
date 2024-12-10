import { Ordiscan } from "../client";

export interface Brc20Info {
  tick: string;
  minted: number;
  max_supply: number;
  price: number;
}

export class Brc20 {
  constructor(
    private readonly client: Ordiscan,
    private readonly name: string,
  ) {}

  async info() {
    return this.client.fetch<Brc20Info>(`/brc20/${this.name}`);
  }
}
