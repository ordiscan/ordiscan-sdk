import { expect, test } from "vitest";

import { mock, ordiscan } from "./utils";
import { MOCK_INSCRIPTION } from "./mocks/inscription";

const ADDRESS =
  "bc1plcx7gv8a48479e5ut4zg2c23q8cuptzxuhzqw5mjqx3qxn855nhqexy4g3";

test("list all inscriptions from address", async () => {
  mock(`/address/${ADDRESS}/inscriptions`).reply(200, {
    data: [MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.address(ADDRESS).inscriptions();

  expect(inscriptions.length).toBe(1);
  expect(inscriptions[0].inscription_number).toBeTypeOf("number");
});

/* test("list all rune balances from address", async () => {
  const runeBalances = await ordiscan
    .address("bc1plcx7gv8a48479e5ut4zg2c23q8cuptzxuhzqw5mjqx3qxn855nhqexy4g3")
    .runes();

  expect(runeBalances.length).toBe(7);
  expect(runeBalances[0].name).toBe("TEST");
}); */
