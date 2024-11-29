import nock from "nock";

import { Ordiscan } from "../src";

export const ordiscan = new Ordiscan({
  auth: process.env.ORDISCAN_ACCESS_TOKEN || "",
  baseUrl: process.env.ORDISCAN_BASE_URL || "",
});

export const mock = (path: string) => {
  return nock("http://localhost:3000").get(`/v1${path}`);
};
