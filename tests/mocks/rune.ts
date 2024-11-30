import { RuneBalance } from "../../src/resources/address";
import { RunicTx } from "../../src/resources/tx";

export const MOCK_RUNE_BALANCE: RuneBalance = {
  name: "RSICGENESISRUNE",
  balance: "648210",
};

export const MOCK_RUNIC_TX: RunicTx = {
  txid: "2dc8414b21accf4a54421cadaa00166bfa64bb1d5019c99b151897fa0bb71534",
  runestone_messages: [
    {
      rune: "DOGGOTOTHEMOON",
      type: "TRANSFER",
    },
  ],
  inputs: [
    {
      address: "bc1p2lrqw3cv9vqzsajf677ght7v38hk7rzfjwm2x9mgqqypnfjphywsg5l237",
      output:
        "3691b43e7a679dc4550a2fb69cc90581a3b532847b3d04a45dc3ec78cefb57e9:1826",
      rune: "DOGGOTOTHEMOON",
      rune_amount: "88980600000",
    },
  ],
  outputs: [
    {
      address: "bc1p8r9p0hthz0jsw75m8s34egdnwft5gl5kdvqt6fp07mcfryxetavszefx50",
      vout: 0,
      rune: "DOGGOTOTHEMOON",
      rune_amount: "88980600000",
    },
  ],
  timestamp: "2024-06-04T13:34:59.000Z",
};
