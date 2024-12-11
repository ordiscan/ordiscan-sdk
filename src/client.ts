import {
  ApiVersion,
  ErrResponse,
  OrdiscanConfig,
  OrdiscanError,
} from "./types";

import { InscriptionResource } from "./resources/inscription";
import { Address } from "./resources/address";
import { Tx } from "./resources/tx";
import { RuneResource } from "./resources/rune";
import { Brc20Resource } from "./resources/brc20";
import { SatResource } from "./resources/sat";

const DEFAULT_BASE_URL = "https://api.ordiscan.com/v1";

export class Ordiscan {
  private readonly baseUrl: string;
  private readonly auth: string;
  private readonly version: ApiVersion;

  public readonly address: (address: string) => Address;
  public readonly tx: (txid: string) => Tx;

  public readonly inscription: InscriptionResource;
  public readonly rune: RuneResource;
  public readonly sat: SatResource;
  public readonly brc20: Brc20Resource;

  constructor(config: OrdiscanConfig) {
    this.auth = config.auth;
    this.baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    this.version = config.version || "v1";

    // Initialize resources
    this.address = (address: string) => new Address(this, address);
    this.tx = (txid: string) => new Tx(this, txid);

    this.inscription = new InscriptionResource(this);
    this.rune = new RuneResource(this);
    this.sat = new SatResource(this);
    this.brc20 = new Brc20Resource(this);
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
      const isMock = !process.env.SKIP_MOCKS;

      console.log(
        `➡️${isMock ? "(mocked)" : "(real)"} ${options.method || "GET"}`,
        url,
      );
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
