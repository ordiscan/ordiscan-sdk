import { z } from "zod";

import { BaseResource } from "./base";
import { Brc20ActionSchema } from "./brc20";
import { SatributeSchema } from "./sat";
import { InscriptionTransfer } from "./tx";

export const InscriptionSchema = z
  .object({
    inscription_id: z.string(),
    inscription_number: z.number(),
    content_type: z.string(),
    owner_address: z.string(),
    owner_output: z.string(),
    timestamp: z.string(),
    metadata: z
      .string()
      .or(z.record(z.string(), z.string().or(z.number())))
      .nullable(),
    metaprotocol: z.string().nullable(),
    sat: z.number(),
    content_url: z.string(),
    parent_inscription_id: z.string().nullable(),
    delegate_inscription_id: z.string().nullable(),
    satributes: z.array(SatributeSchema),
    submodules: z.array(z.string()),
    genesis_address: z.string(),
    genesis_output: z.string(),
    collection_slug: z.string().nullable(),
    sats_name: z.string().nullable(),
    brc20_action: Brc20ActionSchema.nullable(),
  })
  .strict();

export type Inscription = z.infer<typeof InscriptionSchema>;

export class InscriptionResource extends BaseResource {
  async getById({ id }: { id: string }): Promise<Inscription> {
    return this.client.fetch<Inscription>(`/inscription/${id}`);
  }

  async getByNumber({ number }: { number: number }): Promise<Inscription> {
    return this.client.fetch<Inscription>(`/inscription/${number}`);
  }

  async list({
    sort,
    before,
    after,
  }: {
    sort?: "inscription_number_desc" | "inscription_number_asc";
    before?: number;
    after?: number;
  } = {}): Promise<Inscription[]> {
    let url = "/inscriptions";

    const params = new URLSearchParams();

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

    return this.client.fetch<Inscription[]>(url);
  }

  async getTransfers({
    inscriptionId,
  }: {
    inscriptionId: string;
  }): Promise<InscriptionTransfer[]> {
    return this.client.fetch<InscriptionTransfer[]>(
      `/inscription/${inscriptionId}/activity`,
    );
  }
}
