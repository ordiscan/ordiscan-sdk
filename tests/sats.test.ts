import { expect, test } from "vitest";

import { mock, ordiscan } from "./utils";
import { MOCK_SAT } from "./mocks/rareSat";

const SAT_NUMBER = 392_052_419_460;

test("get sat by number", async () => {
  mock(`/sat/${SAT_NUMBER}`).reply(200, {
    data: MOCK_SAT,
  });

  const sat = await ordiscan.sats.get(SAT_NUMBER);

  expect(sat.satributes.length).toBe(2);
});

const UTXO =
  "3d57f76284e17370f1ce45e75f68b5960906c4117951607f20ddd19f85c15706:0";

test("get sat ranges for UTXO", async () => {
  mock(`/utxo/${UTXO}/sat-ranges`).reply(200, {
    data: [[740078609838558, 740078609848558]],
  });

  const satRanges = await ordiscan.sats.list({ utxo: UTXO });

  expect(satRanges.length).toBe(1);
});
