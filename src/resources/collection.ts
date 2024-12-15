import { z } from "zod";
import { BaseResource } from "./base";

export const CollectionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  twitter_link: z.string().nullable(),
  discord_link: z.string().nullable(),
  website_link: z.string().nullable(),
  item_count: z.number(),
});

export type Collection = z.infer<typeof CollectionSchema>;

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
}
