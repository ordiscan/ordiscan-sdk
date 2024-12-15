import { expect, test } from "vitest";

import { mock, ordiscan } from "./utils";
import { MOCK_SAT } from "./mocks/rareSat";
import { SatSchema } from "../src/resources/sat";

const SAT_NUMBER = 392_052_419_460;

test("get sat by number", async () => {
  mock(`/sat/${SAT_NUMBER}`)?.reply(200, {
    data: MOCK_SAT,
  });

  const sat = await ordiscan.sat.getInfo(SAT_NUMBER);

  expect(sat.satributes.length).toBe(2);
  expect(SatSchema.parse(sat)).toBeTruthy();
});
