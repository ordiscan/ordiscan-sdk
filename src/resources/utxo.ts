import { SatributeBalance } from "@/resources/address";
import { BaseResource } from "@/resources/base";
import { SatRange } from "@/resources/sat";

export class UtxoResource extends BaseResource {
  async getSatRanges({ utxo }: { utxo: string }): Promise<SatRange[]> {
    return this.client.fetch<SatRange[]>(`/utxo/${utxo}/sat-ranges`);
  }

  async getRareSats({ utxo }: { utxo: string }): Promise<SatributeBalance[]> {
    return this.client.fetch<SatributeBalance[]>(`/utxo/${utxo}/rare-sats`);
  }
}
