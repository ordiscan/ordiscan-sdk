import { expect, test } from "vitest";
import { MOCK_BRC20_INFO } from "./mocks/brc20";

import { mock, ordiscan } from "./utils";

const TOKEN_NAME = "ordi";

test("get brc20 info", async () => {
  mock(`/brc20/${TOKEN_NAME}`).reply(200, {
    data: MOCK_BRC20_INFO,
  });

  const token = await ordiscan.brc20(TOKEN_NAME).info();

  expect(token.tick).toBeTypeOf("string");
});
