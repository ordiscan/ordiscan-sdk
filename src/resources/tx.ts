import { BaseResource } from "@/resources/base";

import { Inscription } from "@/schemas/inscription";
import { InscriptionTransfer } from "@/schemas/inscriptionTx";
import { RunicTx } from "@/schemas/runicTx";
import { TxInfo } from "@/schemas/tx";

export class TxResource extends BaseResource {
  async getInfo(txid: string) {
    return this.client.fetch<TxInfo>(`/tx/${txid}`);
  }

  async getNewInscriptions({ txid }: { txid: string }) {
    return this.client.fetch<Inscription[]>(`/tx/${txid}/inscriptions`);
  }

  async getInscriptionTransfers({ txid }: { txid: string }) {
    return this.client.fetch<InscriptionTransfer[]>(
      `/tx/${txid}/inscription-transfers`,
    );
  }

  async getRunes({ txid }: { txid: string }) {
    return this.client.fetch<RunicTx>(`/tx/${txid}/runes`);
  }
}
