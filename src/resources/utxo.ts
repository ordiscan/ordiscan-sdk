import { SatributeBalance } from "./address";
import { BaseResource } from "./base";

import { SatRange } from "./sat";

export class UtxoResource extends BaseResource {
  async getSatRanges({ utxo }: { utxo: string }): Promise<SatRange[]> {
    return this.client.fetch<SatRange[]>(`/utxo/${utxo}/sat-ranges`);
  }

  async getRareSats({ utxo }: { utxo: string }): Promise<SatributeBalance[]> {
    return this.client.fetch<SatributeBalance[]>(`/utxo/${utxo}/rare-sats`);
  }
}
