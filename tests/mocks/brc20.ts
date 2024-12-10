import { Brc20Balance } from "../../src/resources/address";
import { Brc20Info } from "../../src/resources/brc20";
import { Brc20Activity } from "../../src/resources/tx";

export const MOCK_BRC20_INFO: Brc20Info = {
  tick: "ORDI",
  max_supply: 21000000,
  minted: 21000000,
  price: 41.57,
};

export const MOCK_BRC20_BALANCE: Brc20Balance = {
  tick: "SATS",
  balance: 100000000,
};

export const MOCK_BRC20_ACTIVITY: Brc20Activity = {
  ticker: "DOMO",
  type: "TRANSFER",
  from_address:
    "bc1pquadyenr7r40g4ud53lhuajxwz3pjye62pgpvdpkv449l5cs9ftq0qh3a7",
  to_address: "bc1pxaneaf3w4d27hl2y93fuft2xk6m4u3wc4rafevc6slgd7f5tq2dqyfgy06",
  amount: 1000,
  inscription_id:
    "dbc5e8525e7b6332b1af2e30d1f199f15dcca45dc6bae2d97182c0f33ea01a50i0",
  timestamp: "2024-11-08T08:37:41.186Z",
};
