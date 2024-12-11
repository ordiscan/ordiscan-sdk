import { expect, test } from "vitest";
import {
  RuneMarketInfoSchema,
  RuneNameSchema,
  RuneBaseSchema,
  RuneWithSupplySchema,
} from "../src/resources/rune";
import {
  MOCK_RUNE_INFO,
  MOCK_RUNE_MARKET_INFO,
  MOCK_RUNE_NAME,
} from "./mocks/rune";

import { mock, ordiscan } from "./utils";

const RUNE_NAME = "UNCOMMONGOODS";

test("list runes", async () => {
  mock(`/runes`)?.reply(200, {
    data: [MOCK_RUNE_INFO],
  });

  const runes = await ordiscan.rune.list();

  expect(runes.length).toBeGreaterThan(0);
  expect(RuneBaseSchema.parse(runes[0])).toBeTruthy();
});

test("list runes (with params)", async () => {
  mock(`/runes?sort=newest&after=20`)?.reply(200, {
    data: [MOCK_RUNE_INFO],
  });

  const runes = await ordiscan.rune.list({
    sort: "newest",
    after: 20,
  });

  expect(runes.length).toBeGreaterThan(0);
  expect(RuneBaseSchema.parse(runes[0])).toBeTruthy();
});

test("get rune info", async () => {
  mock(`/rune/${RUNE_NAME}`)?.reply(200, {
    data: MOCK_RUNE_INFO,
  });

  const rune = await ordiscan.rune.getInfo({ name: RUNE_NAME });

  expect(RuneWithSupplySchema.parse(rune)).toBeTruthy();
});

test("get rune market info", async () => {
  mock(`/rune/${RUNE_NAME}/market`)?.reply(200, {
    data: MOCK_RUNE_MARKET_INFO,
  });

  const market = await ordiscan.rune.getMarketInfo({ name: RUNE_NAME });

  expect(RuneMarketInfoSchema.parse(market)).toBeTruthy();
});

test("get rune unlock date", async () => {
  mock(`/rune-name/HELLO`)?.reply(200, {
    data: MOCK_RUNE_NAME,
  });

  const name = await ordiscan.rune.getUnlockDate({ name: "HELLO" });

  expect(RuneNameSchema.parse(name)).toBeTruthy();
});
