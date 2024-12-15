export type ApiVersion = "v1";

export interface OrdiscanConfig {
  baseUrl?: string;
  version?: ApiVersion;
}

export interface ErrResponse {
  error: {
    message: string;
  };
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
