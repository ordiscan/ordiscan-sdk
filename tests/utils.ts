import { Ordiscan } from "../src";

export const ordiscan = new Ordiscan({
  auth: process.env.ORDISCAN_ACCESS_TOKEN || "",
  baseUrl: process.env.ORDISCAN_BASE_URL || "",
});
