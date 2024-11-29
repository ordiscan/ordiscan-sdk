import { expect, test } from "vitest";
import { ordiscan } from "./utils";

test("list all inscriptions from address", async () => {
  const inscriptions = await ordiscan
    .address("bc1plcx7gv8a48479e5ut4zg2c23q8cuptzxuhzqw5mjqx3qxn855nhqexy4g3")
    .inscriptions();

  expect(inscriptions.length).toBe(1);
  expect(inscriptions[0].inscription_number).toBeTypeOf("number");
});

test("list all rune balances from address", async () => {
  const runeBalances = await ordiscan
    .address("bc1plcx7gv8a48479e5ut4zg2c23q8cuptzxuhzqw5mjqx3qxn855nhqexy4g3")
    .runes();

  expect(runeBalances.length).toBe(7);
  expect(runeBalances[0].name).toBe("TEST");
});
