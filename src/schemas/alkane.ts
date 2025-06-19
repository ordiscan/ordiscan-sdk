import { z } from "zod";

// When getting a list of alkanes:
export const AlkaneBaseSchema = z
  .object({
    id: z.string(),
    name: z.string().nullable(),
    symbol: z.string().nullable(),
    type: z.enum(["TOKEN", "CONTRACT", "NFT_COLLECTION", "NFT_ITEM"]),
    logo_url: z.string().nullable(),
    premined_supply: z.string(),
    amount_per_mint: z.string().nullable(),
    mint_count_cap: z.string().nullable(),
    deploy_txid: z.string().nullable(),
    deploy_timestamp: z.string().nullable(),
  })
  .strict();

export type Alkane = z.infer<typeof AlkaneBaseSchema>;

// When getting a specific alkane:
export const AlkaneWithSupplySchema = AlkaneBaseSchema.extend({
  current_supply: z.string(),
  current_mint_count: z.number(),
});

export type AlkaneWithSupply = z.infer<typeof AlkaneWithSupplySchema>;

// Alkane balance for address
export const AlkaneBalanceSchema = z
  .object({
    id: z.string(),
    name: z.string().nullable(),
    symbol: z.string().nullable(),
    balance: z.string(),
  })
  .strict();

export type AlkaneBalance = z.infer<typeof AlkaneBalanceSchema>;

// Alkane UTXO
export const AlkaneUtxoSchema = z
  .object({
    outpoint: z.string(),
    value: z.number(),
    alkanes: z.array(AlkaneBalanceSchema),
  })
  .strict();

export type AlkaneUtxo = z.infer<typeof AlkaneUtxoSchema>;

// Alkane contract method parameter
export const AlkaneMethodParamSchema = z
  .object({
    type: z.string(),
    name: z.string(),
  })
  .strict();

export type AlkaneMethodParam = z.infer<typeof AlkaneMethodParamSchema>;

// Alkane contract method
export const AlkaneMethodSchema = z
  .object({
    name: z.string(),
    opcode: z.number(),
    params: z.array(AlkaneMethodParamSchema),
    returns: z.string(),
  })
  .strict();

export type AlkaneMethod = z.infer<typeof AlkaneMethodSchema>;

// Alkane metadata
export const AlkaneMetaSchema = z
  .object({
    name: z.string().nullable(),
    methods: z.array(AlkaneMethodSchema).nullable(),
  })
  .strict();

export type AlkaneMeta = z.infer<typeof AlkaneMetaSchema>;

// Protostone message
export const ProtostoneMessageSchema = z
  .object({
    type: z.enum(["TRANSFER", "CONTRACT_CALL", "CONTRACT_DEPLOY", "FACTORY_DEPLOY", "FACTORY_CLONE"]),
    alkaneId: z.string().optional(),
    opcode: z.number().optional(),
    amount: z.string().optional(),
  })
  .strict();

export type ProtostoneMessage = z.infer<typeof ProtostoneMessageSchema>;

// Alkane trace context
export const AlkaneTraceContextSchema = z
  .object({
    myself: z.object({
      block: z.string(),
      tx: z.string(),
    }),
    caller: z.object({
      block: z.string(),
      tx: z.string(),
    }),
    inputs: z.array(z.string()),
    incomingAlkanes: z.array(z.unknown()),
    vout: z.number(),
  })
  .strict();

export type AlkaneTraceContext = z.infer<typeof AlkaneTraceContextSchema>;

// Alkane trace event data
export const AlkaneTraceEventDataSchema = z.union([
  z.object({
    type: z.literal("call"),
    context: AlkaneTraceContextSchema,
    fuel: z.number(),
  }),
  z.object({
    status: z.string(),
    response: z.object({
      alkanes: z.array(z.unknown()),
      data: z.string(),
      storage: z.array(z.unknown()),
    }),
  }),
]);

export type AlkaneTraceEventData = z.infer<typeof AlkaneTraceEventDataSchema>;

// Alkane trace event
export const AlkaneTraceEventSchema = z
  .object({
    event: z.enum(["invoke", "return", "create"]),
    data: AlkaneTraceEventDataSchema,
  })
  .strict();

export type AlkaneTraceEvent = z.infer<typeof AlkaneTraceEventSchema>;

// Alkane transaction info
export const AlkaneTxInfoSchema = z
  .object({
    txid: z.string(),
    protostones: z.array(ProtostoneMessageSchema),
    trace: z.array(AlkaneTraceEventSchema).nullable(),
  })
  .strict();

export type AlkaneTxInfo = z.infer<typeof AlkaneTxInfoSchema>;