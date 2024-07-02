import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseDTO, SaleDTO } from '../models/tile-size.model';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private baseUrl = 'http://localhost:8080/api/sales'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  makeSale(saleDTO: SaleDTO): Observable<SaleDTO> {
    return this.http.post<SaleDTO>(this.baseUrl, saleDTO);
  }
}
