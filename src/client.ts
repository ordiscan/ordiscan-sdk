import { ApiVersion, OrdiscanConfig, OrdiscanError } from "./types";
import { Inscriptions } from "./resources/inscriptions";

const DEFAULT_BASE_URL = "https://api.ordiscan.com/v1";

export class Ordiscan {
  private readonly baseUrl: string;
  private readonly auth: string;
  private readonly version: ApiVersion;

  public readonly inscriptions: Inscriptions;

  constructor(config: OrdiscanConfig) {
    this.auth = config.auth;
    this.baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    this.version = config.version || "v1";

    // Initialize resources
    this.inscriptions = new Inscriptions(this);
  }

  private get apiUrl(): string {
    return `${this.baseUrl}/${this.version}`;
  }

  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = {
      Authorization: `Bearer ${this.auth}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new OrdiscanError(
        `HTTP error! status: ${response.status}`,
        response.status,
        await response.json().catch(() => null),
      );
    }

    const json = await (response.json() as Promise<{ data: T }>);

    return json.data;
  }
}
