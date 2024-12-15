import { BaseResource } from "@/resources/base";

import { Sat } from "@/schemas/sat";

export class SatResource extends BaseResource {
  async getInfo(satNumber: number): Promise<Sat> {
    return this.client.fetch<Sat>(`/sat/${satNumber}`);
  }
}
