import {
  Alkane,
  AlkaneWithSupply,
  AlkaneMeta,
  AlkaneBalance,
  AlkaneUtxo,
  AlkaneTxInfo,
} from "@/schemas/alkane";

export const MOCK_ALKANE_INFO: Alkane = {
  id: "2:16",
  name: "METHANE",
  symbol: "CH4",
  type: "TOKEN",
  logo_url: null,
  premined_supply: "0",
  amount_per_mint: "1000000000000",
  mint_count_cap: "81577",
  deploy_txid:
    "a56a9492a24f85a1deef3eb628d6e1d3a827fc6f75e315bfb88ee0c6540c1b78",
  deploy_timestamp: null,
};

export const MOCK_ALKANE_WITH_SUPPLY: AlkaneWithSupply = {
  ...MOCK_ALKANE_INFO,
  current_supply: "5000000000000000",
  current_mint_count: 5000,
};

export const MOCK_ALKANE_META: AlkaneMeta = {
  name: "BambooRoll",
  methods: [
    {
      name: "initialize",
      opcode: 0,
      params: [],
      returns: "void",
    },
    {
      name: "donate",
      opcode: 42,
      params: [],
      returns: "void",
    },
    {
      name: "roll",
      opcode: 69,
      params: [],
      returns: "void",
    },
  ],
};

export const MOCK_ALKANE_BALANCE: AlkaneBalance = {
  id: "2:42",
  name: "MyToken",
  symbol: "MTK",
  balance: "1000000",
};

export const MOCK_ALKANE_UTXO: AlkaneUtxo = {
  outpoint:
    "04295c622b83ffc81036dbfdc9c5b160468fbb5c22e35b45126d6e876b556645:1686",
  value: 546,
  alkanes: [
    {
      id: "4:2",
      name: "BAMBOO",
      symbol: "BAMBOO",
      balance: "1000",
    },
  ],
};

const MOCK_ALKANE_TRACE = {
  event: "invoke" as const,
  data: {
    type: "call" as const,
    context: {
      myself: {
        block: "867800",
        tx: "2",
      },
      caller: {
        block: "867799",
        tx: "1",
      },
      inputs: ["0x0000000000000064"],
      incomingAlkanes: [],
      vout: 0,
    },
    fuel: 1000000,
  },
};

export const MOCK_ALKANE_TX_INFO: AlkaneTxInfo = {
  txid: "7d0a2dd897222913d58fc957b0429526117a0a61c964642fe93b077f328ccec1",
  protostones: [
    {
      type: "CONTRACT_CALL",
      alkaneId: "867800:2",
      opcode: 1,
      amount: "100",
    },
  ],
  trace: [MOCK_ALKANE_TRACE],
};

