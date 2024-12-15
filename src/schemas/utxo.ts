import { z } from "zod";

import { RuneBalanceSchema } from "./rune";

export const UtxoSchema = z.object({
  outpoint: z.string(),
  value: z.number(),
  runes: z.array(RuneBalanceSchema),
  inscriptions: z.array(z.string()),
});

export type Utxo = z.infer<typeof UtxoSchema>;
