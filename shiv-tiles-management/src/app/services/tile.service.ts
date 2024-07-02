import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { TileDTO } from '../models/tile-size.model';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  private baseUrl = 'http://localhost:8080/api/tiles'; // Update with your backend URL
  private tilesSubject = new BehaviorSubject<TileDTO[]>([]);
  tiles$ = this.tilesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTileDesignsBySize(tileSizeId: number): Observable<TileDTO[]> {
    return this.http.get<TileDTO[]>(`${this.baseUrl}/size/${tileSizeId}`);
  }

  fetchTiles(): void {
    this.http.get<TileDTO[]>(this.baseUrl).subscribe(
      (data) => this.tilesSubject.next(data),
      (error) => console.error('Error fetching tiles', error)
    );
  }

  getTiles(): TileDTO[] {
    return this.tilesSubject.getValue();
  }
}
