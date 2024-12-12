import { expect, test } from "vitest";

import { mock, ordiscan } from "./utils";
import {
  MOCK_INSCRIPTION,
  MOCK_INSCRIPTION_ACTIVITY,
} from "./mocks/inscription";
import { MOCK_RUNE_BALANCE, MOCK_RUNIC_TX } from "./mocks/rune";
import { MOCK_BRC20_BALANCE, MOCK_BRC20_ACTIVITY } from "./mocks/brc20";
import { MOCK_RARE_SAT_BALANCE } from "./mocks/rareSat";
import { InscriptionSchema } from "../src/resources/inscription";
import {
  Brc20BalanceSchema,
  RuneBalanceSchema,
  SatributeBalanceSchema,
} from "../src/resources/address";
import {
  Brc20ActivitySchema,
  InscriptionActivitySchema,
  RunicTxSchema,
} from "../src/resources/tx";

test("list all inscriptions from address", async () => {
  const ADDRESS = "bc1qctx9fzhzf4253ka7jd2s0sf5fqvzffnfvpk5wn";

  mock(`/address/${ADDRESS}/inscriptions`)?.reply(200, {
    data: [MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.address(ADDRESS).inscriptions();

  expect(inscriptions.length).toBeGreaterThan(0);
  expect(InscriptionSchema.parse(inscriptions[0])).toBeTruthy();
});

test("list all inscriptions from address (page 2)", async () => {
  const ADDRESS = "bc1qctx9fzhzf4253ka7jd2s0sf5fqvzffnfvpk5wn";

  mock(`/address/${ADDRESS}/inscriptions?page=2`)?.reply(200, {
    data: [],
  });

  const inscriptions = await ordiscan.address(ADDRESS).inscriptions({
    page: 2,
  });

  expect(inscriptions.length).toBe(0);
});

test("list all rune balances from address", async () => {
  const ADDRESS =
    "bc1plcx7gv8a48479e5ut4zg2c23q8cuptzxuhzqw5mjqx3qxn855nhqexy4g3";

  mock(`/address/${ADDRESS}/runes`)?.reply(200, {
    data: [MOCK_RUNE_BALANCE],
  });

  const runeBalances = await ordiscan.address(ADDRESS).runes();

  expect(runeBalances.length).toBeGreaterThan(0);
  expect(RuneBalanceSchema.parse(runeBalances[0])).toBeTruthy();
});

test("list all BRC-20 balances from address", async () => {
  const ADDRESS =
    "bc1pd2uqctumxjwhtd5xfpar9cre4lec65slg2ed5wrkrhgfmk8uetjs8ee9xc";

  mock(`/address/${ADDRESS}/brc20`)?.reply(200, {
    data: [MOCK_BRC20_BALANCE],
  });

  const brc20Balances = await ordiscan.address(ADDRESS).brc20();

  expect(brc20Balances.length).toBeGreaterThan(0);
  expect(Brc20BalanceSchema.parse(brc20Balances[0])).toBeTruthy();
});

test("list all rare sats from address", async () => {
  const ADDRESS =
    "bc1plcx7gv8a48479e5ut4zg2c23q8cuptzxuhzqw5mjqx3qxn855nhqexy4g3";

  mock(`/address/${ADDRESS}/rare-sats`)?.reply(200, {
    data: [MOCK_RARE_SAT_BALANCE],
  });

  const rareSatBalances = await ordiscan.address(ADDRESS).rareSats();

  expect(SatributeBalanceSchema.parse(rareSatBalances[0])).toBeTruthy();
});

test("list all inscriptions activity for address", async () => {
  const ADDRESS = "bc1qyv5eh8hpmyna7hvhphy6ca4u7j3627k6jzehms";

  mock(`/address/${ADDRESS}/activity`)?.reply(200, {
    data: [MOCK_INSCRIPTION_ACTIVITY],
  });

  const activity = await ordiscan.address(ADDRESS).inscriptionActivity();

  expect(InscriptionActivitySchema.parse(activity[0])).toBeTruthy();
});

test("list all inscriptions activity for address (with params)", async () => {
  const ADDRESS = "bc1qyv5eh8hpmyna7hvhphy6ca4u7j3627k6jzehms";

  mock(`/address/${ADDRESS}/activity?type=inscribe&page=2`)?.reply(200, {
    data: [],
  });

  const activity = await ordiscan.address(ADDRESS).inscriptionActivity({
    type: "inscribe",
    page: 2,
  });

  expect(activity.length).toBe(0);
});

test("list all runes activity for address", async () => {
  const ADDRESS = "bc1qxwrwp3vsl8cuwr7qyd68h2k95q0pnaj5fgc9gp";

  mock(`/address/${ADDRESS}/activity/runes`)?.reply(200, {
    data: [MOCK_RUNIC_TX],
  });

  const activity = await ordiscan.address(ADDRESS).runesActivity();

  expect(activity.length).toBeGreaterThan(0);
  expect(RunicTxSchema.parse(activity[0])).toBeTruthy();
});

test("list all runes activity for address (with params)", async () => {
  const ADDRESS = "bc1qxwrwp3vsl8cuwr7qyd68h2k95q0pnaj5fgc9gp";

  mock(`/address/${ADDRESS}/activity/runes?sort=oldest&page=2`)?.reply(200, {
    data: [],
  });

  const activity = await ordiscan.address(ADDRESS).runesActivity({
    sort: "oldest",
    page: 2,
  });

  expect(activity.length).toBe(0);
});

test("list all BRC-20 activity for address", async () => {
  const ADDRESS =
    "bc1pxaneaf3w4d27hl2y93fuft2xk6m4u3wc4rafevc6slgd7f5tq2dqyfgy06";

  mock(`/address/${ADDRESS}/activity/brc20`)?.reply(200, {
    data: [MOCK_BRC20_ACTIVITY],
  });

  const activity = await ordiscan.address(ADDRESS).brc20Activity();

  expect(activity.length).toBeGreaterThan(0);
  expect(Brc20ActivitySchema.parse(activity[0])).toBeTruthy();
});

test("list all BRC-20 activity for address (with params)", async () => {
  const ADDRESS =
    "bc1pxaneaf3w4d27hl2y93fuft2xk6m4u3wc4rafevc6slgd7f5tq2dqyfgy06";

  mock(`/address/${ADDRESS}/activity/brc20?sort=oldest&page=2`)?.reply(200, {
    data: [],
  });

  const activity = await ordiscan.address(ADDRESS).brc20Activity({
    sort: "oldest",
    page: 2,
  });

  expect(activity.length).toBe(0);
});
