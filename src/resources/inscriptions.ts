import { Satribute } from "./sats";
import { BaseResource } from "./base";
import { InscriptionTransfer } from "./tx";

export interface Inscription {
  inscription_id: string;
  inscription_number: number;
  content_type: string;
  owner_address: string;
  owner_output: string;
  genesis_address: string;
  genesis_output: string;
  timestamp: string;
  metadata: null; // TODO
  metaprotocol: string | null;
  sat: number;
  content_url: string;
  parent_inscription_id: string | null;
  delegate_inscription_id: string | null;
  satributes: Satribute[];
  submodules: string[];
}

export class Inscriptions extends BaseResource {
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
    const params = new URLSearchParams();

    if (sort) {
      params.append("sort", sort);
    }

    if (before) {
      params.append("before", before.toString());
    }

    if (after) {
      params.append("after", after.toString());
    }

    return this.client.fetch<Inscription[]>(
      `/inscriptions?${params.toString()}`,
    );
  }

  async transfers({
    inscriptionId,
  }: {
    inscriptionId: string;
  }): Promise<InscriptionTransfer[]> {
    return this.client.fetch<InscriptionTransfer[]>(
      `/inscription/${inscriptionId}/activity`,
    );
  }
}
