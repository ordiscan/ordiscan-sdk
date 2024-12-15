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

export const SatSchema = z
  .object({
    sat_number: z.number(),
    satributes: z.array(SatributeSchema),
    creation_date: z.string(),
    block_height: z.number(),
    epoch: z.number(),
    inscription_ids: z.array(z.string()),
  })
  .strict();

export type Sat = z.infer<typeof SatSchema>;

export type SatRange = [number, number];

export class SatResource extends BaseResource {
  async getInfo(satNumber: number): Promise<Sat> {
    return this.client.fetch<Sat>(`/sat/${satNumber}`);
  }
}
