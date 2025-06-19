import { BaseResource } from "@/resources/base";

import { Alkane, AlkaneWithSupply, AlkaneMeta } from "@/schemas/alkane";

export class AlkaneResource extends BaseResource {
  async list({
    sort,
    type,
    page,
  }: {
    sort?: "newest" | "oldest";
    type?: "TOKEN" | "CONTRACT" | "NFT_COLLECTION" | "NFT_ITEM";
    page?: number;
  } = {}): Promise<Alkane[]> {
    const params = new URLSearchParams();

    let url = "/alkanes";

    if (sort) {
      params.append("sort", sort);
    }

    if (type) {
      params.append("type", type);
    }

    if (page) {
      params.append("page", page.toString());
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<Alkane[]>(url);
  }

  async getInfo({ id }: { id: string }) {
    return this.client.fetch<AlkaneWithSupply>(`/alkane/${id}`);
  }

  async getMeta({ id }: { id: string }) {
    return this.client.fetch<AlkaneMeta>(`/alkane/${id}/meta`);
  }
}