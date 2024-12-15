import nock from "nock";

import { Ordiscan } from "@/index";

const DEFAULT_TEST_BASE_URL = "http://localhost:3000";
const DEFAULT_TEST_ACCESS_TOKEN = "xyz";

export const ordiscan = new Ordiscan({
  auth: process.env.ORDISCAN_ACCESS_TOKEN || DEFAULT_TEST_ACCESS_TOKEN,
  baseUrl: process.env.ORDISCAN_BASE_URL || DEFAULT_TEST_BASE_URL,
});

export const mock = (path: string) => {
  if (process.env.SKIP_MOCKS) return null;

  return nock(process.env.ORDISCAN_BASE_URL || DEFAULT_TEST_BASE_URL).get(
    `/v1${path}`,
  );
};
