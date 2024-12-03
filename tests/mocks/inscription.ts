import { Inscription } from "../../src/resources/inscriptions";
import { InscriptionActivity } from "../../src/resources/tx";

export const MOCK_INSCRIPTION: Inscription = {
  inscription_id:
    "fae6befd46a68275ec8f1436749ae172cf2d327b03f2358159f32e30831fb606i236",
  inscription_number: 76341881,
  content_type: "text/html;charset=utf-8",
  owner_address:
    "bc1pd2uqctumxjwhtd5xfpar9cre4lec65slg2ed5wrkrhgfmk8uetjs8ee9xc",
  owner_output:
    "d0580fef07c6038f276251c9edeb9a64614d29a0e408eeeb24f934c362fa988a:1",
  genesis_address:
    "bc1ph9kgsyad8kjxll6gr66qtjnhts4hk6jftpkvle04kfhmug2wppss622ts7",
  genesis_output:
    "fae6befd46a68275ec8f1436749ae172cf2d327b03f2358159f32e30831fb606:236",
  timestamp: "2024-10-06T11:10:56.000Z",
  metadata: null,
  metaprotocol: null,
  sat: 1876024435161921,
  content_url:
    "https://ordiscan.com/content/fae6befd46a68275ec8f1436749ae172cf2d327b03f2358159f32e30831fb606i236",
  parent_inscription_id: null,
  delegate_inscription_id: null,
  satributes: [],
  submodules: [
    "974c854784aa251c7e149cdb2188b74293d9c288bf89acc8acde348dcec320edi0",
  ],
};

export const MOCK_INSCRIPTION_ACTIVITY: InscriptionActivity = {
  txid: "9deaa74554c5ee808233d24cf96cfd82bf9d4250f0cfb65e2b8b108e099d5cae",
  type: "INSCRIBE",
  inscription_id:
    "9deaa74554c5ee808233d24cf96cfd82bf9d4250f0cfb65e2b8b108e099d5caei0",
  counterpart_address: null,
  spent_as_fee: false,
  timestamp: "2024-11-07T20:44:52.124Z",
  confirmed: true,
};
