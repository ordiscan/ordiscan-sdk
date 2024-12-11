import { z } from "zod";
import { BaseResource } from "./base";

export const SatributeSchema = z.enum([
  "UNCOMMON",
  "RARE",
  "EPIC",
  "LEGENDARY",
  "MYTHIC",
  "BLACK_UNCOMMON",
  "BLACK_RARE",
  "BLACK_EPIC",
  "BLACK_LEGENDARY",
  "BLACK_MYTHIC",
  "BLOCK_9",
  "BLOCK_78",
  "NAKAMOTO",
  "FIRST_TX",
  "VINTAGE",
  "PIZZA",
  "HITMAN",
  "PALINDROME",
  "ALPHA",
  "OMEGA",
]);

export type Satribute = z.infer<typeof SatributeSchema>;

export interface Sat {
  sat_number: number;
  satributes: Satribute[];
  creation_date: string;
  block_height: number;
  epoch: number;
  inscription_ids: string[];
}

export type SatRange = [number, number];

export class SatResource extends BaseResource {
  async get(satNumber: number): Promise<Sat> {
    return this.client.fetch<Sat>(`/sat/${satNumber}`);
  }

  async list({ utxo }: { utxo: string }): Promise<SatRange[]> {
    return this.client.fetch<SatRange[]>(`/utxo/${utxo}/sat-ranges`);
  }
}
