# Ordiscan SDK

A JavaScript/TypeScript SDK for the [Ordiscan API](https://ordiscan.com/docs/api).

## Installation

```bash
npm install ordiscan
```

## Usage

```typescript
import { Ordiscan } from 'ordiscan';

const ordiscan = new Ordiscan({
  auth: 'your-api-key-here'
});

// Get a specific inscription
const inscription = await ordiscan.inscription.getInfo('b61b0172d95e266c18aea0c624db987e971a5d6d4ebc2aaed85da4642d635735i0');

// List inscriptions with pagination
const inscriptions = await ordiscan.inscription.list({
  sort: "inscription_number_asc",
});
```

## Error Handling

The client throws `OrdiscanError` for API errors:

```typescript
try {
  const inscription = await ordiscan.inscription.getInfo('invalid-id');
} catch (error) {
  if (error instanceof OrdiscanError) {
    console.error(`API Error: ${error.message}`);
    console.error(`Status: ${error.status}`);
    console.error(`Response: ${error.response}`);
  }
}
```

## Configuration

The client accepts the following configuration options:

- `auth` (required): Your Ordiscan API key
- `baseUrl` (optional): Override the default API base URL
