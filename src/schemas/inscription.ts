import { z } from "zod";

import { Brc20ActionSchema } from "./brc20";
import { SatributeSchema } from "./sat";

export const InscriptionTraitSchema = z.object({
  name: z.string(),
  value: z.string(),
  rarity: z.number(),
});

export type InscriptionTrait = z.infer<typeof InscriptionTraitSchema>;

export const InscriptionSchema = z
  .object({
    inscription_id: z.string(),
    inscription_number: z.number(),
    content_type: z.string(),
    owner_address: z.string(),
    owner_output: z.string(),
    timestamp: z.string(),
    metadata: z
      .string()
      .or(z.record(z.string(), z.string().or(z.number())))
      .nullable(),
    metaprotocol: z.string().nullable(),
    sat: z.number(),
    content_url: z.string(),
    parent_inscription_id: z.string().nullable(),
    delegate_inscription_id: z.string().nullable(),
    satributes: z.array(SatributeSchema),
    submodules: z.array(z.string()),
    genesis_address: z.string(),
    genesis_output: z.string(),
    collection_slug: z.string().nullable(),
    sats_name: z.string().nullable(),
    brc20_action: Brc20ActionSchema.nullable(),
  })
  .strict();

export type Inscription = z.infer<typeof InscriptionSchema>;
