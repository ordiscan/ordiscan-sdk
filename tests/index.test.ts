import { expect, test } from "vitest";

import { Ordiscan } from "../src";

const ordiscan = new Ordiscan({
  auth: process.env.ORDISCAN_ACCESS_TOKEN || "",
  baseUrl: process.env.ORDISCAN_BASE_URL || "",
});

test("list inscriptions", async () => {
  const inscriptions = await ordiscan.inscriptions.list();

  expect(inscriptions.length).toBe(100);
  expect(inscriptions[0].inscription_number).toBe(70797116);
  expect(inscriptions[0].inscription_id).toBe(
    "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i0",
  );
});

test("succeed to get valid inscription", async () => {
  const inscription = await ordiscan.inscriptions.get({
    inscriptionId:
      "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i0",
  });

  expect(inscription.inscription_number).toBe(70797116);
});

test("fail to get invalid inscription", async () => {
  await expect(
    ordiscan.inscriptions.get({
      inscriptionId:
        "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i1",
    }),
  ).rejects.toThrow("Inscription not found");
});
