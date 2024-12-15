import nock from "nock";

import { Ordiscan } from "@/index";

const DEFAULT_TEST_BASE_URL = "http://localhost:3000";
const DEFAULT_TEST_API_KEY = "xyz";

const apiKey = process.env.ORDISCAN_ACCESS_TOKEN || DEFAULT_TEST_API_KEY;
const baseUrl = process.env.ORDISCAN_BASE_URL || DEFAULT_TEST_BASE_URL;

export const ordiscan = new Ordiscan(apiKey, {
  baseUrl,
});

export const mock = (path: string) => {
  if (process.env.SKIP_MOCKS) return null;

  return nock(baseUrl).get(`/v1${path}`);
};
