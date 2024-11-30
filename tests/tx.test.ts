import { expect, test } from "vitest";
import { MOCK_INSCRIPTION } from "./mocks/inscription";
import { MOCK_RUNIC_TX } from "./mocks/rune";

import { MOCK_INSCRIPTION_TRANSFER, MOCK_TX_INFO } from "./mocks/tx";
import { mock, ordiscan } from "./utils";

const TXID = "2dc8414b21accf4a54421cadaa00166bfa64bb1d5019c99b151897fa0bb71534";

test("get tx info", async () => {
  mock(`/tx/${TXID}`).reply(200, {
    data: MOCK_TX_INFO,
  });

  const txInfo = await ordiscan.tx(TXID).info();

  expect(txInfo.size).toBeTypeOf("number");
  expect(txInfo.fee).toBeTypeOf("number");
});

test("get inscriptions from tx", async () => {
  mock(`/tx/${TXID}/inscriptions`).reply(200, {
    data: [MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.tx(TXID).inscriptions();

  expect(inscriptions.length).toBe(1);
  expect(inscriptions[0].inscription_number).toBeTypeOf("number");
});

test("get runes from tx", async () => {
  mock(`/tx/${TXID}/runes`).reply(200, {
    data: MOCK_RUNIC_TX,
  });

  const runicTx = await ordiscan.tx(TXID).runes();

  expect(runicTx.runestone_messages[0].rune).toBe("DOGGOTOTHEMOON");
});

test("get transferred inscriptions from tx", async () => {
  mock(`/tx/${TXID}/inscription-transfers`).reply(200, {
    data: [MOCK_INSCRIPTION_TRANSFER],
  });

  const inscriptionTransfers = await ordiscan.tx(TXID).inscriptionTransfers();

  expect(inscriptionTransfers.length).toBe(1);
  expect(inscriptionTransfers[0].inscription_id).toBeTypeOf("string");
});
