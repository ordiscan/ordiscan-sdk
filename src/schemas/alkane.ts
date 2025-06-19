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

// Alkane token ID
export const AlkaneTokenIdSchema = z
  .object({
    block: z.string(),
    tx: z.string(),
  })
  .strict();

export type AlkaneTokenId = z.infer<typeof AlkaneTokenIdSchema>;

// Incoming alkane
export const IncomingAlkaneSchema = z
  .object({
    id: AlkaneTokenIdSchema,
    value: z.string(),
  })
  .strict();

export type IncomingAlkane = z.infer<typeof IncomingAlkaneSchema>;

// Alkane trace context
export const AlkaneTraceContextSchema = z
  .object({
    myself: AlkaneTokenIdSchema,
    caller: AlkaneTokenIdSchema,
    inputs: z.array(z.string()),
    incomingAlkanes: z.array(IncomingAlkaneSchema),
    vout: z.number(),
  })
  .strict();

export type AlkaneTraceContext = z.infer<typeof AlkaneTraceContextSchema>;

// Storage entry
export const StorageEntrySchema = z
  .object({
    key: z.string(),
    value: z.string(),
  })
  .strict();

export type StorageEntry = z.infer<typeof StorageEntrySchema>;

// Alkane create event
export const AlkaneCreateEventSchema = z
  .object({
    event: z.literal("create"),
    data: AlkaneTokenIdSchema,
  })
  .strict();

export type AlkaneCreateEvent = z.infer<typeof AlkaneCreateEventSchema>;

// Alkane invoke event
export const AlkaneInvokeEventSchema = z
  .object({
    event: z.literal("invoke"),
    data: z.object({
      type: z.literal("call"),
      context: AlkaneTraceContextSchema,
      fuel: z.number(),
    }),
  })
  .strict();

export type AlkaneInvokeEvent = z.infer<typeof AlkaneInvokeEventSchema>;

// Alkane return event
export const AlkaneReturnEventSchema = z
  .object({
    event: z.literal("return"),
    data: z.object({
      status: z.enum(["success", "revert"]),
      response: z.object({
        alkanes: z.array(IncomingAlkaneSchema),
        data: z.string(),
        storage: z.array(StorageEntrySchema),
      }),
    }),
  })
  .strict();

export type AlkaneReturnEvent = z.infer<typeof AlkaneReturnEventSchema>;

// Alkane trace event (union of all event types)
export const AlkaneTraceEventSchema = z.union([
  AlkaneCreateEventSchema,
  AlkaneInvokeEventSchema,
  AlkaneReturnEventSchema,
]);

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