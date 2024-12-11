import { expect, test } from "vitest";

import { MOCK_BRC20_INFO } from "./mocks/brc20";
import { mock, ordiscan } from "./utils";

const TOKEN_NAME = "ordi";

test("list brc20 tokens", async () => {
  mock(`/brc20`).reply(200, {
    data: [MOCK_BRC20_INFO],
  });

  const token = await ordiscan.brc20.list();

  expect(token[0].tick).toBeTypeOf("string");
});

test("list brc20 tokens (with params)", async () => {
  mock(`/brc20?sort=oldest&page=2`).reply(200, {
    data: [MOCK_BRC20_INFO],
  });

  const token = await ordiscan.brc20.list({
    sort: "oldest",
    page: 2,
  });

  expect(token[0].tick).toBeTypeOf("string");
});

test("get brc20 info", async () => {
  mock(`/brc20/${TOKEN_NAME}`).reply(200, {
    data: MOCK_BRC20_INFO,
  });

  const token = await ordiscan.brc20.getInfo({ name: TOKEN_NAME });

  expect(token.tick).toBeTypeOf("string");
});
