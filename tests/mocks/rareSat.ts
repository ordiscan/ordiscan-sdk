import { SatributeBalance } from "@/resources/address";
import { Sat } from "@/resources/sat";

export const MOCK_RARE_SAT_BALANCE: SatributeBalance = {
  satributes: ["UNCOMMON", "ALPHA"],
  ranges: [
    [1293460000000000, 1293460000000001],
    [1860015000000000, 1860015000000001],
  ],
};

export const MOCK_SAT: Sat = {
  sat_number: 392052419460,
  satributes: ["BLOCK_78", "VINTAGE"],
  creation_date: "2009-01-11T01:00:54.000Z",
  block_height: 78,
  epoch: 0,
  inscription_ids: [
    "e484c48e4571ddd915ce22dfc037a76c1f42ffcef2fad7c8ee816ed87873fd0ci0",
  ],
};
