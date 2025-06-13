import { BaseResource } from "@/resources/base";

import { Alkane, AlkaneWithSupply } from "@/schemas/alkane";

export class AlkaneResource extends BaseResource {
  async list({
    sort,
    type,
    after,
    before,
  }: {
    sort?: "newest" | "oldest";
    type?: "TOKEN" | "CONTRACT" | "NFT_COLLECTION" | "NFT_ITEM";
    after?: string;
    before?: string;
  } = {}): Promise<Alkane[]> {
    const params = new URLSearchParams();

    let url = "/alkanes";

    if (sort) {
      params.append("sort", sort);
    }

    if (type) {
      params.append("type", type);
    }

    if (before !== undefined) {
      params.append("before", before);
    }

    if (after !== undefined) {
      params.append("after", after);
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<Alkane[]>(url);
  }

  async getInfo({ id }: { id: string }) {
    return this.client.fetch<AlkaneWithSupply>(`/alkane/${id}`);
  }
}