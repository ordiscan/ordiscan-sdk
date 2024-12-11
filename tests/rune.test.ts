import { expect, test } from "vitest";
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
  expect(runes[0].name).toBeTypeOf("string");
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
  expect(runes[0].name).toBeTypeOf("string");
});

test("get rune info", async () => {
  mock(`/rune/${RUNE_NAME}`)?.reply(200, {
    data: MOCK_RUNE_INFO,
  });

  const rune = await ordiscan.rune.getInfo({ name: RUNE_NAME });

  expect(rune.formatted_name).toBeTypeOf("string");
});

test("get rune market info", async () => {
  mock(`/rune/${RUNE_NAME}/market`)?.reply(200, {
    data: MOCK_RUNE_MARKET_INFO,
  });

  const market = await ordiscan.rune.getMarketInfo({ name: RUNE_NAME });

  expect(market.price_in_sats).toBeTypeOf("number");
});

test("get rune unlock date", async () => {
  mock(`/rune-name/HELLO`)?.reply(200, {
    data: MOCK_RUNE_NAME,
  });

  const market = await ordiscan.rune.getUnlockDate({ name: "HELLO" });

  expect(market.status).toBe("LOCKED");
});
