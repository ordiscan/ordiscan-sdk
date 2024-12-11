import { BaseResource } from "./base";

export interface Brc20Info {
  tick: string;
  minted: number;
  max_supply: number;
  price: number;
}

export class Brc20Resource extends BaseResource {
  async list({
    page,
    sort,
  }: {
    page?: number;
    sort?: "oldest" | "newest";
  } = {}) {
    let url = `/brc20`;

    const searchParams = new URLSearchParams();

    if (sort) {
      searchParams.append("sort", sort);
    }

    if (page) {
      searchParams.append("page", page.toString());
    }

    if (searchParams.size) {
      url += `?${searchParams.toString()}`;
    }

    return this.client.fetch<Brc20Info[]>(url);
  }

  async getInfo({ name }: { name: string }) {
    return this.client.fetch<Brc20Info>(`/brc20/${name}`);
  }
}
