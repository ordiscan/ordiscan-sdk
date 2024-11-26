export interface OrdiscanConfig {
  auth: string;
  baseUrl?: string;
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
