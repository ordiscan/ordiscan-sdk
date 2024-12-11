import { expect, test } from "vitest";
import { Brc20Schema } from "../src/resources/brc20";

import { MOCK_BRC20_INFO } from "./mocks/brc20";
import { mock, ordiscan } from "./utils";

const TOKEN_NAME = "ordi";

test("list brc20 tokens", async () => {
  mock(`/brc20`)?.reply(200, {
    data: [MOCK_BRC20_INFO],
  });

  const token = await ordiscan.brc20.list();

  expect(Brc20Schema.parse(token[0])).toBeTruthy();
});

test("list brc20 tokens (with params)", async () => {
  mock(`/brc20?sort=oldest&page=2`)?.reply(200, {
    data: [],
  });

  const tokens = await ordiscan.brc20.list({
    sort: "oldest",
    page: 2,
  });

  expect(tokens.length).toBe(0);
});

test("get brc20 info", async () => {
  mock(`/brc20/${TOKEN_NAME}`)?.reply(200, {
    data: MOCK_BRC20_INFO,
  });

  const token = await ordiscan.brc20.getInfo({ name: TOKEN_NAME });

  expect(Brc20Schema.parse(token)).toBeTruthy();
});
