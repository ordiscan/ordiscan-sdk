import { expect, test } from "vitest";

import { AlkaneTxInfoSchema } from "@/schemas/alkane";
import { MOCK_ALKANE_TX_INFO } from "tests/mocks/alkane";
import { MOCK_INSCRIPTION } from "tests/mocks/inscription";
import { MOCK_RUNIC_TX } from "tests/mocks/rune";
import { MOCK_INSCRIPTION_TRANSFER, MOCK_TX_INFO } from "tests/mocks/tx";
import { mock, ordiscan } from "tests/utils";

test("get tx info", async () => {
  const TXID =
    "2bb85f4b004be6da54f766c17c1e855187327112c231ef2ff35ebad0ea67c69e";

  mock(`/tx/${TXID}`)?.reply(200, {
    data: MOCK_TX_INFO,
  });

  const txInfo = await ordiscan.tx.getInfo(TXID);

  expect(txInfo.size).toBeTypeOf("number");
  expect(txInfo.fee).toBeTypeOf("number");
});

test("get inscriptions from tx", async () => {
  const TXID =
    "6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799";

  mock(`/tx/${TXID}/inscriptions`)?.reply(200, {
    data: [MOCK_INSCRIPTION],
  });

  const inscriptions = await ordiscan.tx.getNewInscriptions({
    txid: TXID,
  });

  expect(inscriptions.length).toBe(1);
  expect(inscriptions[0].inscription_number).toBeTypeOf("number");
});

test("get runes from tx", async () => {
  const TXID =
    "6d30cdee02d2c05778229a5bc23c9a6ee145e3f87c4bf0cac9228d855b92cbc0";

  mock(`/tx/${TXID}/runes`)?.reply(200, {
    data: MOCK_RUNIC_TX,
  });

  const runicTx = await ordiscan.tx.getRunes({
    txid: TXID,
  });

  expect(runicTx.runestone_messages[0].rune).toBeTypeOf("string");
});

test("get transferred inscriptions from tx", async () => {
  const TXID =
    "a03017b45b99a61a69c8f4aa9e649ef476147396f59f0f75c03a156c3cc83aa5";

  mock(`/tx/${TXID}/inscription-transfers`)?.reply(200, {
    data: [MOCK_INSCRIPTION_TRANSFER],
  });

  const inscriptionTransfers = await ordiscan.tx.getInscriptionTransfers({
    txid: TXID,
  });

  expect(inscriptionTransfers.length).toBe(1);
  expect(inscriptionTransfers[0].inscription_id).toBeTypeOf("string");
});

test("get alkanes from tx", async () => {
  const TXID =
    "7d0a2dd897222913d58fc957b0429526117a0a61c964642fe93b077f328ccec1";

  mock(`/tx/${TXID}/alkanes`)?.reply(200, {
    data: MOCK_ALKANE_TX_INFO,
  });

  const alkaneTxInfo = await ordiscan.tx.getAlkanes({
    txid: TXID,
  });

  expect(AlkaneTxInfoSchema.parse(alkaneTxInfo)).toBeTruthy();
  expect(alkaneTxInfo.txid).toBe(TXID);
  expect(alkaneTxInfo.protostones.length).toBeGreaterThan(0);
});
