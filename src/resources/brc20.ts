import { BaseResource } from "@/resources/base";

import { Brc20Token } from "@/schemas/brc20";

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
