import { expect, test } from "vitest";

import { Brc20ActivitySchema, Brc20BalanceSchema } from "@/schemas/brc20";
import { InscriptionSchema } from "@/schemas/inscription";
import { InscriptionActivitySchema } from "@/schemas/inscriptionTx";
import { RuneBalanceSchema } from "@/schemas/rune";
import { RunicTxSchema } from "@/schemas/runicTx";
import { RareSatBalanceSchema } from "@/schemas/sat";
import { UtxoSchema } from "@/schemas/utxo";

import { MOCK_BRC20_BALANCE, MOCK_BRC20_ACTIVITY } from "tests/mocks/brc20";
import {
  MOCK_INSCRIPTION,
  MOCK_INSCRIPTION_ACTIVITY,
} from "tests/mocks/inscription";
import { MOCK_RARE_SAT_BALANCE } from "tests/mocks/rareSat";
import { MOCK_RUNE_BALANCE, MOCK_RUNIC_TX } from "tests/mocks/rune";
import { MOCK_UTXO } from "tests/mocks/utxo";

import { mock, ordiscan } from "tests/utils";

test("list all UTXOs from address", async () => {
  const ADDRESS =
    "bc1plcx7gv8a48479e5ut4zg2c23q8cuptzxuhzqw5mjqx3qxn855nhqexy4g3";

  mock(`/address/${ADDRESS}/utxos`)?.reply(200, {
    data: [MOCK_UTXO],
  });

  const utxos = await ordiscan.address.getUtxos({
    address: ADDRESS,
  });

  expect(utxos.length).toBeGreaterThan(0);
  expect(UtxoSchema.parse(utxos[0])).toBeTruthy();
});

test("list all inscriptions from address", async () => {
  const ADDRESS = "bc1qctx9fzhzf4253ka7jd2s0sf5fqvzffnfvpk5wn";

  mock(`/address/${ADDRESS}/inscriptions`)?.reply(200, {
    data: [MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.address.getInscriptions({
    address: ADDRESS,
  });

  expect(inscriptions.length).toBeGreaterThan(0);
  expect(InscriptionSchema.parse(inscriptions[0])).toBeTruthy();
});

test("list all inscriptions from address (page 2)", async () => {
  const ADDRESS = "bc1qctx9fzhzf4253ka7jd2s0sf5fqvzffnfvpk5wn";

  mock(`/address/${ADDRESS}/inscriptions?page=2`)?.reply(200, {
    data: [],
  });

  const inscriptions = await ordiscan.address.getInscriptions({
    address: ADDRESS,
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

  const runeBalances = await ordiscan.address.getRunes({
    address: ADDRESS,
  });

  expect(runeBalances.length).toBeGreaterThan(0);
  expect(RuneBalanceSchema.parse(runeBalances[0])).toBeTruthy();
});

test("list all BRC-20 balances from address", async () => {
  const ADDRESS =
    "bc1pd2uqctumxjwhtd5xfpar9cre4lec65slg2ed5wrkrhgfmk8uetjs8ee9xc";

  mock(`/address/${ADDRESS}/brc20`)?.reply(200, {
    data: [MOCK_BRC20_BALANCE],
  });

  const brc20Balances = await ordiscan.address.getBrc20Tokens({
    address: ADDRESS,
  });

  expect(brc20Balances.length).toBeGreaterThan(0);
  expect(Brc20BalanceSchema.parse(brc20Balances[0])).toBeTruthy();
});

test("list all rare sats from address", async () => {
  const ADDRESS =
    "bc1plcx7gv8a48479e5ut4zg2c23q8cuptzxuhzqw5mjqx3qxn855nhqexy4g3";

  mock(`/address/${ADDRESS}/rare-sats`)?.reply(200, {
    data: [MOCK_RARE_SAT_BALANCE],
  });

  const rareSatBalances = await ordiscan.address.getRareSats({
    address: ADDRESS,
  });

  expect(RareSatBalanceSchema.parse(rareSatBalances[0])).toBeTruthy();
});

test("list all inscription activity for address", async () => {
  const ADDRESS = "bc1qyv5eh8hpmyna7hvhphy6ca4u7j3627k6jzehms";

  mock(`/address/${ADDRESS}/activity`)?.reply(200, {
    data: [MOCK_INSCRIPTION_ACTIVITY],
  });

  const activity = await ordiscan.address.getInscriptionActivity({
    address: ADDRESS,
  });

  expect(InscriptionActivitySchema.parse(activity[0])).toBeTruthy();
});

test("list all inscription activity for address (with params)", async () => {
  const ADDRESS = "bc1qyv5eh8hpmyna7hvhphy6ca4u7j3627k6jzehms";

  mock(`/address/${ADDRESS}/activity?type=inscribe&page=2`)?.reply(200, {
    data: [],
  });

  const activity = await ordiscan.address.getInscriptionActivity({
    address: ADDRESS,
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

  const activity = await ordiscan.address.getRunesActivity({
    address: ADDRESS,
  });

  expect(activity.length).toBeGreaterThan(0);
  expect(RunicTxSchema.parse(activity[0])).toBeTruthy();
});

test("list all runes activity for address (with params)", async () => {
  const ADDRESS = "bc1qxwrwp3vsl8cuwr7qyd68h2k95q0pnaj5fgc9gp";

  mock(`/address/${ADDRESS}/activity/runes?sort=oldest&page=2`)?.reply(200, {
    data: [],
  });

  const activity = await ordiscan.address.getRunesActivity({
    address: ADDRESS,
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

  const activity = await ordiscan.address.getBrc20Activity({
    address: ADDRESS,
  });

  expect(activity.length).toBeGreaterThan(0);
  expect(Brc20ActivitySchema.parse(activity[0])).toBeTruthy();
});

test("list all BRC-20 activity for address (with params)", async () => {
  const ADDRESS =
    "bc1pxaneaf3w4d27hl2y93fuft2xk6m4u3wc4rafevc6slgd7f5tq2dqyfgy06";

  mock(`/address/${ADDRESS}/activity/brc20?sort=oldest&page=2`)?.reply(200, {
    data: [],
  });

  const activity = await ordiscan.address.getBrc20Activity({
    address: ADDRESS,
    sort: "oldest",
    page: 2,
  });

  expect(activity.length).toBe(0);
});
