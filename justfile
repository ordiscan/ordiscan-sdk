default:
  @just --choose

test:
  npm test

test-server:
  SKIP_MOCKS=1 npm test

build:
  npm run build
