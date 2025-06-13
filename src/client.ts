import { AddressResource } from "@/resources/address";
import { AlkaneResource } from "@/resources/alkane";
import { Brc20Resource } from "@/resources/brc20";
import { CollectionResource } from "@/resources/collection";
import { InscriptionResource } from "@/resources/inscription";
import { RuneResource } from "@/resources/rune";
import { SatResource } from "@/resources/sat";
import { TxResource } from "@/resources/tx";
import { UtxoResource } from "@/resources/utxo";

import {
  ApiVersion,
  ErrResponse,
  OrdiscanConfig,
  OrdiscanError,
} from "@/types";

const DEFAULT_BASE_URL = "https://api.ordiscan.com";

export class Ordiscan {
  private readonly baseUrl: string;
  private readonly auth: string;
  private readonly version: ApiVersion;

  public readonly address: AddressResource;
  public readonly alkane: AlkaneResource;
  public readonly tx: TxResource;
  public readonly inscription: InscriptionResource;
  public readonly rune: RuneResource;
  public readonly sat: SatResource;
  public readonly brc20: Brc20Resource;
  public readonly collection: CollectionResource;
  public readonly utxo: UtxoResource;

  constructor(apiKey: string, config?: OrdiscanConfig) {
    this.auth = apiKey;
    this.baseUrl = config?.baseUrl || DEFAULT_BASE_URL;
    this.version = config?.version || "v1";

    // Initialize resources
    this.address = new AddressResource(this);
    this.alkane = new AlkaneResource(this);
    this.tx = new TxResource(this);
    this.inscription = new InscriptionResource(this);
    this.rune = new RuneResource(this);
    this.sat = new SatResource(this);
    this.brc20 = new Brc20Resource(this);
    this.collection = new CollectionResource(this);
    this.utxo = new UtxoResource(this);
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
