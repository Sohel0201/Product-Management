import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseDTO } from '../models/tile-size.model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private baseUrl = 'http://localhost:8080/api/purchases'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  makePurchase(purchaseDTO: PurchaseDTO): Observable<PurchaseDTO> {
    return this.http.post<PurchaseDTO>(this.baseUrl, purchaseDTO);
  }
}
