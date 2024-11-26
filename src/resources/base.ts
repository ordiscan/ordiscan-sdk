import { Ordiscan } from "../client";

export class BaseResource {
  constructor(protected readonly client: Ordiscan) {}
}
