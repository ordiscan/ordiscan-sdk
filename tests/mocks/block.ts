import { Block, RuneTxids } from "@/schemas/block";

export const MOCK_BLOCK_INFO: Block = {
  hash: "0000000000000000000320283a032748cef8227873ff4872689bf23f1cda83a5",
  height: 840000,
  timestamp: "2024-04-19T23:09:27.000Z",
  size: 2325617,
  weight: 3993281,
  status: {
    runes_indexed: true,
    inscriptions_indexed: true,
  },
};

export const MOCK_RUNE_TXIDS: RuneTxids = [
  "2bb85f4b004be6da54f766c17c1e855187327112c231ef2ff35ebad0ea67c69e",
  "152b928e97bb9e874da1bd4abdf766ae0cdc7a2f260dad5542967cb414c58489",
  "e79134080a83fe3e0e06ed6990c5a9b63b362313341745707a2bff7d788a1375",
];