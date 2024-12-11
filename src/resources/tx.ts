import { z } from "zod";

import { Ordiscan } from "../client";
import { Inscription } from "./inscription";

export const RunestoneMessageSchema = z.object({
  rune: z.string(),
  type: z.enum(["TRANSFER", "MINT", "ETCH"]),
});

export type RunestoneMessage = z.infer<typeof RunestoneMessageSchema>;

export const RunicInputSchema = z.object({
  address: z.string(),
  output: z.string(),
  rune: z.string(),
  rune_amount: z.string(),
});

export type RunicInput = z.infer<typeof RunicInputSchema>;

export const RunicOutputSchema = z.object({
  address: z.string(),
  vout: z.number(),
  rune: z.string(),
  rune_amount: z.string(),
});

export type RunicOutput = z.infer<typeof RunicOutputSchema>;

export const RunicTxSchema = z.object({
  txid: z.string(),
  runestone_messages: z.array(RunestoneMessageSchema),
  inputs: z.array(RunicInputSchema),
  outputs: z.array(RunicOutputSchema),
  timestamp: z.string(),
});

export type RunicTx = z.infer<typeof RunicTxSchema>;

export const InscriptionTransferSchema = z.object({
  from_address: z.string(),
  to_address: z.string(),
  inscription_id: z.string(),
  spent_as_fee: z.boolean(),
  txid: z.string(),
  confirmed: z.boolean(),
  timestamp: z.string(),
});

export type InscriptionTransfer = z.infer<typeof InscriptionTransferSchema>;

export const InscriptionActivitySchema = z.object({
  txid: z.string(),
  type: z.enum(["INSCRIBE", "RECEIVE", "SEND"]),
  inscription_id: z.string(),
  counterpart_address: z.string().nullable(),
  spent_as_fee: z.boolean(),
  confirmed: z.boolean(),
  timestamp: z.string(),
});

export type InscriptionActivity = z.infer<typeof InscriptionActivitySchema>;

export const Brc20ActivitySchema = z.object({
  ticker: z.string(),
  type: z.enum(["TRANSFER", "MINT", "DEPLOY"]),
  from_address: z.string().nullable(),
  to_address: z.string().nullable(),
  amount: z.number(),
  inscription_id: z.string(),
  timestamp: z.string(),
});

export type Brc20Activity = z.infer<typeof Brc20ActivitySchema>;

export const TxInfoSchema = z.object({
  txid: z.string(),
  fee: z.number(),
  size: z.number(),
  weight: z.number(),
  confirmed: z.boolean(),
  block_hash: z.string(),
  indexed: z.boolean(),
  has_inscriptions: z.boolean(),
  has_inscription_transfers: z.boolean(),
  has_runes: z.boolean(),
});

export type TxInfo = z.infer<typeof TxInfoSchema>;

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
