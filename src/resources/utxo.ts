import { BaseResource } from "@/resources/base";

import { RareSatBalance, SatRange } from "@/schemas/sat";

export class UtxoResource extends BaseResource {
  async getSatRanges({ utxo }: { utxo: string }): Promise<SatRange[]> {
    return this.client.fetch<SatRange[]>(`/utxo/${utxo}/sat-ranges`);
  }

  async getRareSats({ utxo }: { utxo: string }): Promise<RareSatBalance[]> {
    return this.client.fetch<RareSatBalance[]>(`/utxo/${utxo}/rare-sats`);
  }
}
