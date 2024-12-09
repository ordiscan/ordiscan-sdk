import { expect, test } from "vitest";

import { mock, ordiscan } from "./utils";
import { MOCK_INSCRIPTION } from "./mocks/inscription";
import { MOCK_INSCRIPTION_TRANSFER } from "./mocks/tx";

test("list all inscriptions", async () => {
  mock(`/inscriptions`).reply(200, {
    data: [MOCK_INSCRIPTION, MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.inscriptions.list();

  expect(inscriptions.length).toBe(2);
  expect(inscriptions[0].inscription_number).toBe(
    MOCK_INSCRIPTION.inscription_number,
  );
});

test("list all inscriptions (with params)", async () => {
  mock(`/inscriptions?sort=inscription_number_desc&after=20`).reply(200, {
    data: [MOCK_INSCRIPTION, MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.inscriptions.list({
    after: 20,
    sort: "inscription_number_desc",
  });

  expect(inscriptions.length).toBe(2);
  expect(inscriptions[0].inscription_number).toBe(
    MOCK_INSCRIPTION.inscription_number,
  );
});

test("succeed to get inscription by ID", async () => {
  const id =
    "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i0";

  mock(`/inscription/${id}`).reply(200, {
    data: MOCK_INSCRIPTION,
  });

  const inscription = await ordiscan.inscriptions.getById({
    id,
  });

  expect(inscription.inscription_number).toBe(
    MOCK_INSCRIPTION.inscription_number,
  );
});

test("succeed to get inscription by number", async () => {
  const number = 1;

  mock(`/inscription/${number}`).reply(200, {
    data: MOCK_INSCRIPTION,
  });

  const inscription = await ordiscan.inscriptions.getByNumber({
    number,
  });

  expect(inscription.inscription_number).toBe(
    MOCK_INSCRIPTION.inscription_number,
  );
});

test("fail to get invalid inscription", async () => {
  const invalidInscriptionId =
    "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i1";

  mock(`/inscription/${invalidInscriptionId}`).reply(404, {
    error: {
      message: "Inscription not found",
    },
  });

  await expect(
    ordiscan.inscriptions.getById({
      id: invalidInscriptionId,
    }),
  ).rejects.toThrow("Inscription not found");
});

test("list inscription transfers", async () => {
  const id =
    "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i0";

  mock(`/inscription/${id}/activity`).reply(200, {
    data: [MOCK_INSCRIPTION_TRANSFER],
  });

  const transfers = await ordiscan.inscriptions.transfers({
    inscriptionId: id,
  });

  expect(transfers[0].inscription_id).toBe(
    MOCK_INSCRIPTION_TRANSFER.inscription_id,
  );
});
