import { expect, test } from "vitest";
import { MOCK_INSCRIPTION } from "./mocks/inscription";
import { MOCK_RUNIC_TX } from "./mocks/rune";
import { MOCK_INSCRIPTION_TRANSFER, MOCK_TX_INFO } from "./mocks/tx";

import { mock, ordiscan } from "./utils";

test("get tx info", async () => {
  const TXID =
    "2bb85f4b004be6da54f766c17c1e855187327112c231ef2ff35ebad0ea67c69e";

  mock(`/tx/${TXID}`)?.reply(200, {
    data: MOCK_TX_INFO,
  });

  const txInfo = await ordiscan.tx(TXID).info();

  expect(txInfo.size).toBeTypeOf("number");
  expect(txInfo.fee).toBeTypeOf("number");
});

test("get inscriptions from tx", async () => {
  const TXID =
    "6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799";

  mock(`/tx/${TXID}/inscriptions`)?.reply(200, {
    data: [MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.tx(TXID).inscriptions();

  expect(inscriptions.length).toBe(1);
  expect(inscriptions[0].inscription_number).toBeTypeOf("number");
});

test("get runes from tx", async () => {
  const TXID =
    "6d30cdee02d2c05778229a5bc23c9a6ee145e3f87c4bf0cac9228d855b92cbc0";

  mock(`/tx/${TXID}/runes`)?.reply(200, {
    data: MOCK_RUNIC_TX,
  });

  const runicTx = await ordiscan.tx(TXID).runes();

  expect(runicTx.runestone_messages[0].rune).toBeTypeOf("string");
});

test("get transferred inscriptions from tx", async () => {
  const TXID =
    "a03017b45b99a61a69c8f4aa9e649ef476147396f59f0f75c03a156c3cc83aa5";

  mock(`/tx/${TXID}/inscription-transfers`)?.reply(200, {
    data: [MOCK_INSCRIPTION_TRANSFER],
  });

  const inscriptionTransfers = await ordiscan.tx(TXID).inscriptionTransfers();

  expect(inscriptionTransfers.length).toBe(1);
  expect(inscriptionTransfers[0].inscription_id).toBeTypeOf("string");
});
