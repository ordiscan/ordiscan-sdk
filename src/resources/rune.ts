import { BaseResource } from "@/resources/base";

import { Rune, RuneMarketInfo, RuneName } from "@/schemas/rune";

export class RuneResource extends BaseResource {
  async list({
    sort,
    after,
    before,
  }: {
    sort?: "newest" | "oldest";
    after?: number;
    before?: number;
  } = {}): Promise<Rune[]> {
    const params = new URLSearchParams();

    let url = "/runes";

    if (sort) {
      params.append("sort", sort);
    }

    if (before !== undefined) {
      params.append("before", before.toString());
    }

    if (after !== undefined) {
      params.append("after", after.toString());
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<Rune[]>(url);
  }

  async getInfo({ name }: { name: string }) {
    return this.client.fetch<Rune>(`/rune/${name}`);
  }

  async getMarketInfo({ name }: { name: string }) {
    return this.client.fetch<RuneMarketInfo>(`/rune/${name}/market`);
  }

  async getUnlockDate({ name }: { name: string }) {
    return this.client.fetch<RuneName>(`/rune-name/${name}`);
  }
}
