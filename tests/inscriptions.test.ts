import { expect, test } from "vitest";

import { mock, ordiscan } from "./utils";
import { MOCK_INSCRIPTION } from "./mocks/inscription";

test("list all inscriptions", async () => {
  mock(`/inscriptions?limit=20`).reply(200, {
    data: [MOCK_INSCRIPTION, MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.inscriptions.list();

  expect(inscriptions.length).toBe(2);
  expect(inscriptions[0].inscription_number).toBe(
    MOCK_INSCRIPTION.inscription_number,
  );
});

test("list all inscriptions by address", async () => {
  const address =
    "bc1pr8vjq0fk89f5sw3r4n9scrasvw7kaud9akhzw57c3ygycsjspvvseyjcma";

  mock(`/inscriptions?address=${address}&limit=20`).reply(200, {
    data: [MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.inscriptions.list({
    address,
  });

  expect(inscriptions.length).toBe(1);
});

test("succeed to get inscription by ID", async () => {
  const inscriptionId =
    "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i0";

  mock(`/inscription/${inscriptionId}`).reply(200, {
    data: MOCK_INSCRIPTION,
  });

  const inscription = await ordiscan.inscriptions.get({
    inscriptionId,
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
    ordiscan.inscriptions.get({
      inscriptionId: invalidInscriptionId,
    }),
  ).rejects.toThrow("Inscription not found");
});
