// src/app/models/tile-size.model.ts
export interface TileDTO {
  id: number;
  design: string;
  stock: number;
  tileSize: TileSizeDTO;
  sales: SaleDTO[];
  purchases: PurchaseDTO[];
}

export interface SaleDTO {
  id: number;
  saleQty: number;

  tile: TileDTO;
}

export interface PurchaseDTO {
  id: number;
  purchaseQty: number;

  tile: TileDTO;
}

export interface TileSizeDTO {
  id: number;
  size: string;
  tiles: TileDTO[];
}
