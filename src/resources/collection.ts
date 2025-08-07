import { BaseResource } from "@/resources/base";

import { Collection, CollectionMarketInfo } from "@/schemas/collection";

export class CollectionResource extends BaseResource {
  async list({
    page,
  }: {
    page?: number;
  } = {}): Promise<Collection[]> {
    const params = new URLSearchParams();

    let url = "/collections";

    if (page !== undefined) {
      params.append("page", page.toString());
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<Collection[]>(url);
  }

  async getInfo({ slug }: { slug: string }) {
    return this.client.fetch<Collection>(`/collection/${slug}`);
  }

  async getInscriptions({ slug }: { slug: string }) {
    return this.client.fetch<string[]>(`/collection/${slug}/inscriptions`);
  }

  async getMarketInfo({ slug }: { slug: string }): Promise<CollectionMarketInfo> {
    return this.client.fetch<CollectionMarketInfo>(`/collection/${slug}/market`);
  }
}
