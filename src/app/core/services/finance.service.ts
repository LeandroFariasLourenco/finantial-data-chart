import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PetraAssetResponse } from "../models/petra-asset-response.interface";

@Injectable()
export class FinanceService {
  private url = '/petra';

  constructor (private httpClient: HttpClient) {  }

  public fetchAssetsPrices(interval: string, range: string): Observable<PetraAssetResponse> {
    return this.httpClient.get<PetraAssetResponse>(this.url, { params: {
      "interval": interval,
      "range": range
    } });
  }
}