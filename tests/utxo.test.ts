import { expect, test } from "vitest";

import { SatributeBalanceSchema } from "@/resources/address";

import { MOCK_RARE_SAT_BALANCE } from "tests/mocks/rareSat";
import { mock, ordiscan } from "tests/utils";

test("get sat ranges for UTXO", async () => {
  const UTXO =
    "3d57f76284e17370f1ce45e75f68b5960906c4117951607f20ddd19f85c15706:0";

  mock(`/utxo/${UTXO}/sat-ranges`)?.reply(200, {
    data: [[740078609838558, 740078609848558]],
  });

  const satRanges = await ordiscan.utxo.getSatRanges({ utxo: UTXO });

  expect(satRanges.length).toBe(1);
  expect(satRanges[0][0]).toBeTypeOf("number");
  expect(satRanges[0][1]).toBeTypeOf("number");
});

test("get rare sats for UTXO", async () => {
  const UTXO =
    "56b52f2b88db4062833049cadfccd53c372955810f3a4077d0058327540a7f7f:1";

  mock(`/utxo/${UTXO}/rare-sats`)?.reply(200, {
    data: [MOCK_RARE_SAT_BALANCE],
  });

  const rareSats = await ordiscan.utxo.getRareSats({ utxo: UTXO });

  expect(rareSats.length).toBeGreaterThan(0);
  expect(SatributeBalanceSchema.parse(rareSats[0])).toBeTruthy();
});
