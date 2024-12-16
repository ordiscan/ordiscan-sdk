# Ordiscan SDK

A JavaScript/TypeScript SDK for the [Ordiscan API](https://ordiscan.com/docs/api).

[![npm version](https://img.shields.io/npm/v/ordiscan.svg?style=flat-square)](https://www.npmjs.com/package/ordiscan)

## Installation

```bash
npm install ordiscan
```

## Getting started

```typescript
import { Ordiscan } from 'ordiscan';

const ordiscan = new Ordiscan('your-api-key-here');

const inscription = await ordiscan.inscription.getInfo('b61b0172d95e266c18aea0c624db987e971a5d6d4ebc2aaed85da4642d635735i0');
```

See the [docs](https://ordiscan.com/docs/api) for a full list of available methods and to obtain an API key!

## Examples

```typescript
// Get the info for an inscription:
await ordiscan.inscription.getInfo('b61b0172d95e266c18aea0c624db987e971a5d6d4ebc2aaed85da4642d635735i0');

// Get the rune balance for an address:
await ordiscan.address.getRunes({
  address: "bc1pr8vjq0fk89f5sw3r4n9scrasvw7kaud9akhzw57c3ygycsjspvvseyjcma",
});

// Get the rare sats for an address:
await ordiscan.address.getRareSats({
  address: "bc1pr8vjq0fk89f5sw3r4n9scrasvw7kaud9akhzw57c3ygycsjspvvseyjcma",
});

// Get the inscriptions in a collection:
await ordiscan.collection.getInscriptions({
  collectionSlug: "taproot-wizards"
});

// Get the rare sats in a UTXO:
await ordiscan.utxo.getRareSats({
  utxo: "3d57f76284e17370f1ce45e75f68b5960906c4117951607f20ddd19f85c15706:0"
});

// Get the current price of a rune:
await ordiscan.rune.getMarketInfo({
  name: "UNCOMMONGOODS"
});
```
