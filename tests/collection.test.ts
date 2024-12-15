import { expect, test } from "vitest";

import { CollectionSchema } from "../src/resources/collection";
import { MOCK_COLLECTION } from "./mocks/collection";

import { mock, ordiscan } from "./utils";

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
