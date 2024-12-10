import { BaseResource } from "./base";

export interface Brc20Info {
  tick: string;
  minted: number;
  max_supply: number;
  price: number;
}

export class Brc20Resource extends BaseResource {
  // TODO: list()

  async getInfo({ name }: { name: string }) {
    return this.client.fetch<Brc20Info>(`/brc20/${name}`);
  }
}
