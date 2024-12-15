import { BaseResource } from "@/resources/base";

import { Inscription, InscriptionTrait } from "@/schemas/inscription";
import { InscriptionTransfer } from "@/schemas/inscriptionTx";

export class InscriptionResource extends BaseResource {
  async getInfo(identifier: string | number): Promise<Inscription> {
    return this.client.fetch<Inscription>(`/inscription/${identifier}`);
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
    page,
  }: {
    inscriptionId: string;
    page?: number;
  }): Promise<InscriptionTransfer[]> {
    let url = `/inscription/${inscriptionId}/activity`;

    const params = new URLSearchParams();

    if (page !== undefined) {
      params.append("page", page.toString());
    }

    if (params.size) {
      url += `?${params.toString()}`;
    }

    return this.client.fetch<InscriptionTransfer[]>(url);
  }

  async getTraits({
    inscriptionId,
  }: {
    inscriptionId: string;
  }): Promise<InscriptionTrait[]> {
    return this.client.fetch<InscriptionTrait[]>(
      `/inscription/${inscriptionId}/traits`,
    );
  }
}
