export type ApiVersion = "v1";

export interface OrdiscanConfig {
  auth: string;
  baseUrl?: string;
  version?: ApiVersion;
}

export class OrdiscanError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any,
  ) {
    super(message);
    this.name = "OrdiscanError";
  }
}
