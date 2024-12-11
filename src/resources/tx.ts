import { Ordiscan } from "../client";
import { Inscription } from "./inscription";

interface RunestoneMessage {
  rune: string;
  type: "TRANSFER" | "MINT" | "ETCH";
}

interface RunicInput {
  address: string;
  output: string;
  rune: string;
  rune_amount: string;
}

interface RunicOutput {
  address: string;
  vout: number;
  rune: string;
  rune_amount: string;
}

export interface RunicTx {
  txid: string;
  runestone_messages: RunestoneMessage[];
  inputs: RunicInput[];
  outputs: RunicOutput[];
  timestamp: string; // TODO: change?
}

export interface InscriptionTransfer {
  from_address: string;
  to_address: string;
  inscription_id: string;
  spent_as_fee: boolean;
  txid: string;
  confirmed: boolean;
  timestamp: string; // TODO: change to date?
}

export interface InscriptionActivity {
  txid: string;
  type: "INSCRIBE" | "RECEIVE" | "SEND";
  inscription_id: string;
  counterpart_address: string | null;
  spent_as_fee: boolean;
  confirmed: boolean;
  timestamp: string;
}

export interface Brc20Activity {
  ticker: string;
  type: "TRANSFER" | "MINT" | "DEPLOY";
  from_address: string | null;
  to_address: string | null;
  amount: number;
  inscription_id: string;
  timestamp: string;
}

export interface TxInfo {
  txid: string;
  fee: number;
  size: number;
  weight: number;
  confirmed: boolean;
  block_hash: string;
  indexed: boolean;
  has_inscriptions: boolean;
  has_inscription_transfers: boolean;
  has_runes: boolean;
}

export class Tx {
  constructor(
    private readonly client: Ordiscan,
    private readonly txid: string,
  ) {}

  async info() {
    return this.client.fetch<TxInfo>(`/tx/${this.txid}`);
  }

  async inscriptions() {
    return this.client.fetch<Inscription[]>(`/tx/${this.txid}/inscriptions`);
  }

  async inscriptionTransfers() {
    return this.client.fetch<InscriptionTransfer[]>(
      `/tx/${this.txid}/inscription-transfers`,
    );
  }

  async runes() {
    return this.client.fetch<RunicTx>(`/tx/${this.txid}/runes`);
  }
}
