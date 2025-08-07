import { expect, test } from "vitest";

import { CollectionSchema, CollectionMarketInfoSchema } from "@/schemas/collection";

import { MOCK_COLLECTION } from "tests/mocks/collection";

import { mock, ordiscan } from "tests/utils";

test("list collections", async () => {
  mock(`/collections?page=1`)?.reply(200, {
    data: [MOCK_COLLECTION],
  });

  const collections = await ordiscan.collection.list({
    page: 1,
  });

  expect(collections.length).toBeGreaterThan(0);
  expect(CollectionSchema.parse(collections[0])).toBeTruthy();
});

test("get collection by slug", async () => {
  mock(`/collection/taproot-wizards`)?.reply(200, {
    data: MOCK_COLLECTION,
  });

  const collection = await ordiscan.collection.getInfo({
    slug: "taproot-wizards",
  });

  expect(CollectionSchema.parse(collection)).toBeTruthy();
});

test("get inscriptions IDs in collection", async () => {
  mock(`/collection/taproot-wizards/inscriptions`)?.reply(200, {
    data: [
      "0301e0480b374b32851a9462db29dc19fe830a7f7d7a88b81612b9d42099c0aei0",
      "1008850869eb564cad900c316a02f65854f531b31a2ef96bacecd536be96b031i0",
    ],
  });

  const inscriptionIds = await ordiscan.collection.getInscriptions({
    slug: "taproot-wizards",
  });

  expect(inscriptionIds.length).toBeGreaterThan(0);
  expect(inscriptionIds[0]).toBeTypeOf("string");
});

test("get collection market info", async () => {
  const mockMarketInfo = {
    floor_price_in_sats: 4210950,
    floor_price_in_usd: 4972,
    market_cap_in_btc: 251.76,
    market_cap_in_usd: 29727870,
  };

  mock(`/collection/bitcoin-puppets/market`)?.reply(200, {
    data: mockMarketInfo,
  });

  const marketInfo = await ordiscan.collection.getMarketInfo({
    slug: "bitcoin-puppets",
  });

  expect(CollectionMarketInfoSchema.parse(marketInfo)).toBeTruthy();
  expect(marketInfo.floor_price_in_sats).toBe(4210950);
  expect(marketInfo.floor_price_in_usd).toBe(4972);
  expect(marketInfo.market_cap_in_btc).toBe(251.76);
  expect(marketInfo.market_cap_in_usd).toBe(29727870);
});
