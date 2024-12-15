import { z } from "zod";

import { BaseResource } from "@/resources/base";

export const Brc20ActionTypeSchema = z.enum(["TRANSFER", "MINT", "DEPLOY"]);

export const Brc20ActionSchema = z.object({
  tick: z.string(),
  type: Brc20ActionTypeSchema,
});

export const Brc20TokenSchema = z
  .object({
    tick: z.string(),
    minted: z.number(),
    max_supply: z.number(),
    price: z.number().nullable(),
  })
  .strict();

export type Brc20Token = z.infer<typeof Brc20TokenSchema>;

export class Brc20Resource extends BaseResource {
  async list({
    page,
    sort,
  }: {
    page?: number;
    sort?: "oldest" | "newest";
  } = {}) {
    let url = `/brc20`;

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

    return this.client.fetch<Brc20Token[]>(url);
  }

  async getInfo({ name }: { name: string }) {
    return this.client.fetch<Brc20Token>(`/brc20/${name}`);
  }
}
