import { Satribute } from "./address";
import { BaseResource } from "./base";

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
  /**
   * Get a specific inscription by ID
   */
  async get({
    inscriptionId,
  }: {
    inscriptionId: string;
  }): Promise<Inscription> {
    return this.client.fetch<Inscription>(`/inscription/${inscriptionId}`);
  }

  /**
   * List inscriptions with pagination
   */
  async list({
    address,
    after,
    limit = 20,
  }: { address?: string; after?: string; limit?: number } = {}): Promise<
    Inscription[]
  > {
    const params = new URLSearchParams();

    if (address) {
      params.append("address", address);
    }

    if (after) {
      params.append("after", after);
    }

    params.append("limit", limit.toString());

    return this.client.fetch<Inscription[]>(
      `/inscriptions?${params.toString()}`,
    );
  }
}
