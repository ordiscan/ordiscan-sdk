import { Alkane, AlkaneWithSupply } from "@/schemas/alkane";

export const MOCK_ALKANE_INFO: Alkane = {
  id: "2:16",
  name: "METHANE",
  symbol: "CH4",
  type: "TOKEN",
  premined_supply: "0",
  amount_per_mint: "1000000000000",
  mint_count_cap: "81577",
  deploy_txid: "a56a9492a24f85a1deef3eb628d6e1d3a827fc6f75e315bfb88ee0c6540c1b78",
  deploy_timestamp: null,
  deploy_block_height: null,
  deploy_block_hash: null,
  resource_number: 797,
};

export const MOCK_ALKANE_WITH_SUPPLY: AlkaneWithSupply = {
  ...MOCK_ALKANE_INFO,
  current_supply: "5000000000000000",
  current_mint_count: 5000,
};