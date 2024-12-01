import { expect, test } from "vitest";
import { MOCK_RUNE_INFO, MOCK_RUNE_MARKET_INFO } from "./mocks/rune";

import { mock, ordiscan } from "./utils";

const RUNE_NAME = "UNCOMMONGOODS";

test("get rune info", async () => {
  mock(`/rune/${RUNE_NAME}`).reply(200, {
    data: MOCK_RUNE_INFO,
  });

  const rune = await ordiscan.rune(RUNE_NAME).info();

  expect(rune.formatted_name).toBeTypeOf("string");
});

test("get rune market info", async () => {
  mock(`/rune/${RUNE_NAME}/market`).reply(200, {
    data: MOCK_RUNE_MARKET_INFO,
  });

  const market = await ordiscan.rune(RUNE_NAME).market();

  expect(market.price_in_sats).toBeTypeOf("number");
});
