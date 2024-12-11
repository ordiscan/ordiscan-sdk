import { z } from "zod";
import { BaseResource } from "./base";

export const Brc20Schema = z
  .object({
    tick: z.string(),
    minted: z.number(),
    max_supply: z.number(),
    price: z.number(),
  })
  .strict();

export type Brc20 = z.infer<typeof Brc20Schema>;

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

    return this.client.fetch<Brc20[]>(url);
  }

  async getInfo({ name }: { name: string }) {
    return this.client.fetch<Brc20>(`/brc20/${name}`);
  }
}
