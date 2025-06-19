import { BaseResource } from "@/resources/base";

import { Block, RuneTxids } from "@/schemas/block";

export class BlockResource extends BaseResource {
  async getInfo({
    hashOrHeight,
  }: {
    hashOrHeight: string | number;
  }): Promise<Block> {
    return this.client.fetch<Block>(`/block/${hashOrHeight}`);
  }

  async getRuneTxids({
    hashOrHeight,
  }: {
    hashOrHeight: string | number;
  }): Promise<RuneTxids> {
    return this.client.fetch<RuneTxids>(`/block/${hashOrHeight}/rune_txids`);
  }
}

