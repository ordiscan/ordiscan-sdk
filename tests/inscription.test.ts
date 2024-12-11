import { expect, test } from "vitest";

import { mock, ordiscan } from "./utils";
import { MOCK_INSCRIPTION } from "./mocks/inscription";
import { MOCK_INSCRIPTION_TRANSFER } from "./mocks/tx";
import { InscriptionSchema } from "../src/resources/inscription";

test("list all inscriptions", async () => {
  mock(`/inscriptions`)?.reply(200, {
    data: [MOCK_INSCRIPTION, MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.inscription.list();

  expect(inscriptions.length).toBeGreaterThan(0);
  expect(InscriptionSchema.parse(inscriptions[0])).toBeTruthy();
});

test("list all inscriptions (with params)", async () => {
  mock(`/inscriptions?sort=inscription_number_desc&after=20`)?.reply(200, {
    data: [MOCK_INSCRIPTION, MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.inscription.list({
    sort: "inscription_number_desc",
    after: 20,
  });

  expect(inscriptions.length).toBeGreaterThan(0);
  expect(InscriptionSchema.parse(inscriptions[0])).toBeTruthy();
});

test("succeed to get inscription by ID", async () => {
  const id =
    "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i0";

  mock(`/inscription/${id}`)?.reply(200, {
    data: MOCK_INSCRIPTION,
  });

  const inscription = await ordiscan.inscription.getById({
    id,
  });

  expect(InscriptionSchema.parse(inscription)).toBeTruthy();
});

test("succeed to get inscription by number", async () => {
  const number = 1;

  mock(`/inscription/${number}`)?.reply(200, {
    data: MOCK_INSCRIPTION,
  });

  const inscription = await ordiscan.inscription.getByNumber({
    number,
  });

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
    ordiscan.inscription.getById({
      id: invalidInscriptionId,
    }),
  ).rejects.toThrow("Inscription not found");
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

  expect(transfers[0].inscription_id).toBeTypeOf("string");
});
