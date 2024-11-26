import { BaseResource } from "./base";

export interface InscriptionResponse {
  id: string;
  number: number;
  address: string;
  output: string;
  value: string;
  height: number;
  fee: string;
  sat: string;
  content_type: string;
  timestamp: number;
  genesis_timestamp: number;
  genesis_height: number;
  genesis_fee: string;
  genesis_address: string;
  content_length: number;
  content: string;
}

export interface ListInscriptionsParams {
  after?: string;
  limit?: number;
}

export interface GetInscriptionParams {
  inscriptionId: string;
}

export class Inscriptions extends BaseResource {
  /**
   * Get a specific inscription by ID
   */
  async get({
    inscriptionId,
  }: GetInscriptionParams): Promise<InscriptionResponse> {
    return this.client.fetch<InscriptionResponse>(
      `/inscription/${inscriptionId}`,
    );
  }

  /**
   * List inscriptions with pagination
   */
  async list({ after, limit = 20 }: ListInscriptionsParams = {}): Promise<
    InscriptionResponse[]
  > {
    const params = new URLSearchParams();
    if (after) {
      params.append("after", after);
    }

    params.append("limit", limit.toString());

    return this.client.fetch<InscriptionResponse[]>(
      `/inscriptions?${params.toString()}`,
    );
  }
}
