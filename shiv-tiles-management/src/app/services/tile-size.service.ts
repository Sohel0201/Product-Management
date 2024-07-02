import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TileDTO, TileSizeDTO } from '../models/tile-size.model';

@Injectable({
  providedIn: 'root',
})
export class TileSizeService {
  private baseUrl = 'http://localhost:8080/api/tile-sizes'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getTileSizes(): Observable<TileSizeDTO[]> {
    return this.http.get<TileSizeDTO[]>(this.baseUrl);
  }

  createTileSize(tileSizeDTO: TileSizeDTO): Observable<TileSizeDTO> {
    return this.http.post<TileSizeDTO>(this.baseUrl, tileSizeDTO);
  }

  // createTile(tile: TileDTO): Observable<TileDTO> {
  //   return this.http.post<TileDTO>(`${this.baseUrl}/tiles`, tile);
  // }
  getTileDesignsBySize(tileSizeId: number): Observable<TileDTO[]> {
    return this.http.get<TileDTO[]>(`${this.baseUrl}/${tileSizeId}`);
  }
}
