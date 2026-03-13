# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a TypeScript SDK for the Ordiscan API (docs: https://ordiscan.com/docs/api) that provides Bitcoin Ordinals and Runes data. The main client class `Ordiscan` initializes all resource classes and handles authentication/HTTP requests.

## Standard workflow

NEVER use the "any" type in TypeScript. Also avoid "unknown". Try to be as specific as possible.

After implementing a feature, run `just lint` and `just test-once` to make sure that there are no errors in the implementation.

### Core Structure

- **Client**: `src/client.ts` - Main `Ordiscan` class with authentication and fetch logic
- **Resources**: `src/resources/` - API endpoint wrappers that extend `BaseResource`
  - Each resource (address, inscription, rune, etc.) corresponds to different API endpoints
  - Resources use the client's `fetch()` method for authenticated requests
- **Schemas**: `src/schemas/` - Zod schemas for argument and response validation. Always define types using Zod schemas with `z.infer<>` (not plain TypeScript interfaces), since tests validate responses against them. New types must also be re-exported from `src/index.ts`.
- **Types**: `src/types.ts` - Core types and error classes

### Resource Pattern

All API resources extend `BaseResource` and use the client's fetch method:
```typescript
export class ExampleResource extends BaseResource {
  async getData(params: { id: string }) {
    return this.client.fetch<ResponseType>(`/endpoint/${params.id}`);
  }
}
```

### Path Aliases

- `@/*` maps to `src/*`
- `tests/*` maps to `tests/*`

## Releasing to NPM

To publish a new version to NPM:

1. Bump the version in `package.json`
2. Commit and push to `main`

The GitHub Action will automatically publish if the version is higher than what's currently on NPM. No git tag required.
