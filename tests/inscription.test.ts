import { expect, test } from "vitest";

import {
  InscriptionSchema,
  InscriptionTraitSchema,
} from "@/resources/inscription";
import { InscriptionTransferSchema } from "@/resources/tx";

import {
  MOCK_BRC20_INSCRIPTION,
  MOCK_INSCRIPTION,
  MOCK_INSCRIPTION_TRAIT,
} from "tests/mocks/inscription";
import { MOCK_INSCRIPTION_TRANSFER } from "tests/mocks/tx";
import { mock, ordiscan } from "tests/utils";

test("list all inscriptions (with params)", async () => {
  mock(`/inscriptions?sort=inscription_number_asc&after=0`)?.reply(200, {
    data: [MOCK_INSCRIPTION, MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.inscription.list({
    sort: "inscription_number_asc",
    after: 0,
  });

  expect(inscriptions.length).toBeGreaterThan(0);
  expect(InscriptionSchema.parse(inscriptions[0])).toBeTruthy();
});

test("get inscription by ID", async () => {
  const inscriptionId =
    "26482871f33f1051f450f2da9af275794c0b5f1c61ebf35e4467fb42c2813403i0";

  mock(`/inscription/${inscriptionId}`)?.reply(200, {
    data: MOCK_INSCRIPTION,
  });

  const inscription = await ordiscan.inscription.getInfo(inscriptionId);

  expect(InscriptionSchema.parse(inscription)).toBeTruthy();
});

test("get inscription by number", async () => {
  const number = 1;

  mock(`/inscription/${number}`)?.reply(200, {
    data: MOCK_INSCRIPTION,
  });

  const inscription = await ordiscan.inscription.getInfo(number);

  expect(InscriptionSchema.parse(inscription)).toBeTruthy();
});

test("fail to get invalid inscription", async () => {
  const invalidInscriptionId =
    "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i1";

  mock(`/inscription/${invalidInscriptionId}`)?.reply(404, {
    error: {
      message: "Inscription not found",
    },
  });

  await expect(
    ordiscan.inscription.getInfo(invalidInscriptionId),
  ).rejects.toThrow("Inscription not found");
});

test("get BRC-20 inscription", async () => {
  const id =
    "b61b0172d95e266c18aea0c624db987e971a5d6d4ebc2aaed85da4642d635735i0";

  mock(`/inscription/${id}`)?.reply(200, {
    data: MOCK_BRC20_INSCRIPTION,
  });

  const inscription = await ordiscan.inscription.getInfo(id);

  expect(InscriptionSchema.parse(inscription)).toBeTruthy();
});

test("list inscription transfers", async () => {
  const id =
    "26482871f33f1051f450f2da9af275794c0b5f1c61ebf35e4467fb42c2813403i0";

  mock(`/inscription/${id}/activity`)?.reply(200, {
    data: [MOCK_INSCRIPTION_TRANSFER],
  });

  const transfers = await ordiscan.inscription.getTransfers({
    inscriptionId: id,
  });

  expect(InscriptionTransferSchema.parse(transfers[0])).toBeTruthy();
});

test("list inscription traits", async () => {
  const id =
    "783513f2044d48fdf303e58b1d8878a2394a695e2a9cac320c4823f09524a296i0";

  mock(`/inscription/${id}/traits`)?.reply(200, {
    data: [MOCK_INSCRIPTION_TRAIT],
  });

  const traits = await ordiscan.inscription.getTraits({
    inscriptionId: id,
  });

  expect(InscriptionTraitSchema.parse(traits[0])).toBeTruthy();
});
