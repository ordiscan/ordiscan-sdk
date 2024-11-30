import { expect, test } from "vitest";

import { mock, ordiscan } from "./utils";
import { MOCK_INSCRIPTION } from "./mocks/inscription";
import { MOCK_RUNE_BALANCE } from "./mocks/rune";
import { MOCK_BRC20_BALANCE } from "./mocks/brc20";
import { MOCK_RARE_SAT_BALANCE } from "./mocks/rareSat";

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

test("list all rune balances from address", async () => {
  mock(`/address/${ADDRESS}/runes`).reply(200, {
    data: [MOCK_RUNE_BALANCE],
  });

  const runeBalances = await ordiscan.address(ADDRESS).runes();

  expect(runeBalances.length).toBe(1);
  expect(runeBalances[0].name).toBe("RSICGENESISRUNE");
});

test("list all BRC-20 balances from address", async () => {
  mock(`/address/${ADDRESS}/brc20`).reply(200, {
    data: [MOCK_BRC20_BALANCE],
  });

  const brc20Balances = await ordiscan.address(ADDRESS).brc20();

  expect(brc20Balances.length).toBe(1);
  expect(brc20Balances[0].tick).toBe("SATS");
});

test("list all rare sats from address", async () => {
  mock(`/address/${ADDRESS}/rare-sats`).reply(200, {
    data: [MOCK_RARE_SAT_BALANCE],
  });

  const rareSatBalances = await ordiscan.address(ADDRESS).rareSats();

  expect(rareSatBalances[0].satributes.length).toBe(2);
  expect(rareSatBalances[0].ranges.length).toBe(2);
});
