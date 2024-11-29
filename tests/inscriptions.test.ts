import { expect, test } from "vitest";
import { ordiscan } from "./utils";

test("list all inscriptions", async () => {
  const inscriptions = await ordiscan.inscriptions.list();

  expect(inscriptions.length).toBe(100);
  expect(inscriptions[0].inscription_number).toBe(70797116);
  expect(inscriptions[0].inscription_id).toBe(
    "aa063cd70a4d526d2a3f0d7b1bc7328dd42de6e86b73c1c95785dfc2ac99e060i0",
  );
});

test("list all inscriptions by address", async () => {
  const inscriptions = await ordiscan.inscriptions.list({
    address: "bc1pr8vjq0fk89f5sw3r4n9scrasvw7kaud9akhzw57c3ygycsjspvvseyjcma",
  });

  expect(inscriptions.length).toBe(0);
});

test("succeed to get inscription by ID", async () => {
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
