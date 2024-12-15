# Ordiscan SDK

A JavaScript/TypeScript SDK for the [Ordiscan API](https://ordiscan.com/docs/api).

## Installation

```bash
npm install ordiscan
```

## Usage

```typescript
import { Ordiscan } from 'ordiscan';

const ordiscan = new Ordiscan('your-api-key-here');

const inscription = await ordiscan.inscription.getInfo('b61b0172d95e266c18aea0c624db987e971a5d6d4ebc2aaed85da4642d635735i0');
```

See the [docs](https://ordiscan.com/docs/api) for a full list of available methods and to obtain an API key.
