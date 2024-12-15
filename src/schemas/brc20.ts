import { z } from "zod";

export const Brc20ActionTypeSchema = z.enum(["TRANSFER", "MINT", "DEPLOY"]);

export const Brc20ActionSchema = z.object({
  tick: z.string(),
  type: Brc20ActionTypeSchema,
});

export const Brc20TokenSchema = z
  .object({
    tick: z.string(),
    minted: z.number(),
    max_supply: z.number(),
    price: z.number().nullable(),
  })
  .strict();

export type Brc20Token = z.infer<typeof Brc20TokenSchema>;

export const Brc20BalanceSchema = z.object({
  tick: z.string(),
  balance: z.number(),
});

export type Brc20Balance = z.infer<typeof Brc20BalanceSchema>;

export const Brc20ActivitySchema = z.object({
  ticker: z.string(),
  type: Brc20ActionTypeSchema,
  from_address: z.string().nullable(),
  to_address: z.string().nullable(),
  amount: z.number(),
  inscription_id: z.string(),
  timestamp: z.string(),
});

export type Brc20Activity = z.infer<typeof Brc20ActivitySchema>;
