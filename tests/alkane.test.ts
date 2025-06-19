import { expect, test } from "vitest";

import {
  AlkaneBaseSchema,
  AlkaneWithSupplySchema,
} from "@/schemas/alkane";

import {
  MOCK_ALKANE_INFO,
  MOCK_ALKANE_WITH_SUPPLY,
} from "tests/mocks/alkane";

import { mock, ordiscan } from "tests/utils";

const ALKANE_ID = "2:16";

test("list alkanes", async () => {
  mock(`/alkanes`)?.reply(200, {
    data: [MOCK_ALKANE_INFO],
  });

  const alkanes = await ordiscan.alkane.list();

  expect(alkanes.length).toBeGreaterThan(0);
  expect(AlkaneBaseSchema.parse(alkanes[0])).toBeTruthy();
});

test("list alkanes (with params)", async () => {
  mock(`/alkanes?sort=newest&type=TOKEN&page=2`)?.reply(200, {
    data: [MOCK_ALKANE_INFO],
  });

  const alkanes = await ordiscan.alkane.list({
    sort: "newest",
    type: "TOKEN",
    page: 2,
  });

  expect(alkanes.length).toBeGreaterThan(0);
  expect(AlkaneBaseSchema.parse(alkanes[0])).toBeTruthy();
});

test("get alkane info", async () => {
  mock(`/alkane/${ALKANE_ID}`)?.reply(200, {
    data: MOCK_ALKANE_WITH_SUPPLY,
  });

  const alkane = await ordiscan.alkane.getInfo({ id: ALKANE_ID });

  expect(AlkaneWithSupplySchema.parse(alkane)).toBeTruthy();
});