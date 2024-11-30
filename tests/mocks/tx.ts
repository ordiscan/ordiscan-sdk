import { InscriptionTransfer, TxInfo } from "../../src/resources/tx";

export const MOCK_TX_INFO: TxInfo = {
  txid: "2dc8414b21accf4a54421cadaa00166bfa64bb1d5019c99b151897fa0bb71534",
  fee: 5454,
  size: 434,
  weight: 1211,
  confirmed: true,
  block_hash:
    "00000000000000000001420c8990b4553a8106addf12fa9630b2fca2009b865a",
  indexed: true,
  has_inscriptions: false,
  has_inscription_transfers: false,
  has_runes: true,
};

export const MOCK_INSCRIPTION_TRANSFER: InscriptionTransfer = {
  from_address:
    "bc1p3fm2w5c5e2kmkf5nuzfymj5dylhr3mt0pvv02td4q7k8609ek2dstdqevk",
  to_address: "bc1plq4d70nk09hw9rnr0aqmr2lr03kn0v3dywu60m8g6256n0cxtm2q5wh2ah",
  inscription_id:
    "f07c9f52c8337edbb60ae4345150a48e287f17006a651300ad18306a2e86868ci0",
  spent_as_fee: false,
  txid: "7d0a2dd897222913d58fc957b0429526117a0a61c964642fe93b077f328ccec1",
  confirmed: true,
  timestamp: "2024-05-05T07:24:24.000Z",
};
