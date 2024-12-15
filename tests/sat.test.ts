import { expect, test } from "vitest";

import { SatSchema } from "@/resources/sat";

import { MOCK_SAT } from "tests/mocks/rareSat";
import { mock, ordiscan } from "tests/utils";

const SAT_NUMBER = 392_052_419_460;

test("get sat by number", async () => {
  mock(`/sat/${SAT_NUMBER}`)?.reply(200, {
    data: MOCK_SAT,
  });

  const sat = await ordiscan.sat.getInfo(SAT_NUMBER);

  expect(sat.satributes.length).toBe(2);
  expect(SatSchema.parse(sat)).toBeTruthy();
});
