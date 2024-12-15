import { Utxo } from "@/resources/address";

export const MOCK_UTXO: Utxo = {
  outpoint:
    "04295c622b83ffc81036dbfdc9c5b160468fbb5c22e35b45126d6e876b556645:1687",
  value: 546,
  runes: [
    {
      name: "DOGGOTOTHEMOON",
      balance: "900000000000000",
    },
  ],
  inscriptions: [
    "26482871f33f1051f450f2da9af275794c0b5f1c61ebf35e4467fb42c2813403i0",
  ],
};
