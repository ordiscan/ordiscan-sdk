import { expect, test } from "vitest";

import { BlockSchema, RuneTxidsSchema } from "@/schemas/block";

import { MOCK_BLOCK_INFO, MOCK_RUNE_TXIDS } from "tests/mocks/block";

import { mock, ordiscan } from "tests/utils";

const BLOCK_HEIGHT = 840000;

test("get block info by height", async () => {
  mock(`/block/${BLOCK_HEIGHT}`)?.reply(200, {
    data: MOCK_BLOCK_INFO,
  });

  const block = await ordiscan.block.getInfo({ hashOrHeight: BLOCK_HEIGHT });

  expect(BlockSchema.parse(block)).toBeTruthy();
  expect(block.height).toBe(BLOCK_HEIGHT);
});

test("get rune txids by height", async () => {
  mock(`/block/${BLOCK_HEIGHT}/rune_txids`)?.reply(200, {
    data: MOCK_RUNE_TXIDS,
  });

  const txids = await ordiscan.block.getRuneTxids({
    hashOrHeight: BLOCK_HEIGHT,
  });

  expect(RuneTxidsSchema.parse(txids)).toBeTruthy();
  expect(txids.length).toBeGreaterThan(0);
  expect(typeof txids[0]).toBe("string");
});

