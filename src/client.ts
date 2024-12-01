import {
  ApiVersion,
  ErrResponse,
  OrdiscanConfig,
  OrdiscanError,
} from "./types";
import { Inscriptions } from "./resources/inscriptions";
import { Address } from "./resources/address";
import { Tx } from "./resources/tx";
import { Rune } from "./resources/rune";

const DEFAULT_BASE_URL = "https://api.ordiscan.com/v1";

export class Ordiscan {
  private readonly baseUrl: string;
  private readonly auth: string;
  private readonly version: ApiVersion;

  public readonly inscriptions: Inscriptions;
  public readonly address: (address: string) => Address;
  public readonly tx: (txid: string) => Tx;
  public readonly rune: (name: string) => Rune;

  constructor(config: OrdiscanConfig) {
    this.auth = config.auth;
    this.baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    this.version = config.version || "v1";

    // Initialize resources
    this.inscriptions = new Inscriptions(this);
    this.address = (address: string) => new Address(this, address);
    this.tx = (txid: string) => new Tx(this, txid);
    this.rune = (name: string) => new Rune(this, name);
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

    if (process.env.NODE_ENV === "test") {
      console.log("➡️", options.method || "GET", url);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const err = await (response.json() as Promise<ErrResponse>).catch(
        () => null,
      );

      throw new OrdiscanError(
        err?.error.message || "Request failed!",
        response.status,
      );
    }

    const json = await (response.json() as Promise<{ data: T }>);

    return json.data;
  }
}
