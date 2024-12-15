import { z } from "zod";

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
