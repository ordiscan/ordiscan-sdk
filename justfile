default:
  @just --choose

test:
  npm test

test-once:
  npx vitest --no-watch

test-server:
  SKIP_MOCKS=1 npm test

lint:
  npm run lint

build:
  npm run build
