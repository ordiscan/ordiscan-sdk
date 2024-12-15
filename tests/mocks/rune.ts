import {
  Rune,
  RuneBalance,
  RuneMarketInfo,
  RuneName,
  RuneWithSupply,
} from "@/schemas/rune";
import { RunicTx } from "@/schemas/runicTx";

export const MOCK_RUNE_INFO: Rune = {
  id: "1:0",
  name: "UNCOMMONGOODS",
  formatted_name: "UNCOMMON•GOODS",
  spacers: 128,
  number: 0,
  inscription_id: null,
  decimals: 0,
  mint_count_cap: "340282366920938463463374607431768211455",
  symbol: "⧉",
  etching_txid: null,
  amount_per_mint: "1",
  timestamp_unix: "0",
  premined_supply: "0",
  mint_start_block: 840000,
  mint_end_block: 1050000,
};

export const MOCK_RUNE_WITH_SUPPLY: RuneWithSupply = {
  ...MOCK_RUNE_INFO,
  current_supply: "36303629",
  current_mint_count: 36303629,
};

export const MOCK_RUNE_MARKET_INFO: RuneMarketInfo = {
  price_in_sats: 12.38,
  price_in_usd: 0.00878,
  market_cap_in_btc: 12380,
  market_cap_in_usd: 878001980,
};

export const MOCK_RUNE_NAME: RuneName = {
  name: "HELLO",
  status: "LOCKED",
  unlock_block_height: 975173,
  unlock_block_timestamp: "2026-11-14T23:15:07.000Z",
};

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
