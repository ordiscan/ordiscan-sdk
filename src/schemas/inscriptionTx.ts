import { z } from "zod";

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
