import { BaseResource } from "./base";
import { RuneInfo } from "./rune";

export class Runes extends BaseResource {
  async list({
    sort,
    after,
    before,
  }: {
    sort?: "newest" | "oldest";
    after?: number;
    before?: number;
  } = {}): Promise<RuneInfo[]> {
    const params = new URLSearchParams();

    if (sort) {
      params.append("sort", sort);
    }

    if (before) {
      params.append("before", before.toString());
    }

    if (after) {
      params.append("after", after.toString());
    }

    return this.client.fetch<RuneInfo[]>(`/runes?${params.toString()}`);
  }
}
