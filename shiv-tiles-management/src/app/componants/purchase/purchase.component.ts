import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TileSizeService } from '../../services/tile-size.service';
import {
  PurchaseDTO,
  TileDTO,
  TileSizeDTO,
} from '../../models/tile-size.model';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddTileSizeDialogComponent } from '../add-tile-size-dialog/add-tile-size-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TileService } from '../../services/tile.service';
import { PurchaseService } from '../../services/purchase.service';
import { TableHeaderCheckbox, TableModule } from 'primeng/table';

@Component({
  selector: 'app-purchase',
  standalone: true,
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    RouterLink,
    TableModule,
    MatDialogModule,
  ],
})
export class PurchaseComponent implements OnInit {
  tileSizeInput = new FormControl('');
  tileSizes: TileSizeDTO[] = [];
  filteredTileSizes!: Observable<TileSizeDTO[]>;
  tileDesignInput = new FormControl('');
  tileDesigns: TileDTO[] = [];
  filteredTileDesigns!: Observable<TileDTO[]>;
  quantityInput = new FormControl('');
  tiles: TileDTO[] = [];
  purchases: PurchaseDTO[] = [];

  constructor(
    private tileSizeService: TileSizeService,
    public dialog: MatDialog,
    public tileService: TileService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    // Fetch tile sizes and set up filteredTileSizes observable
    this.tileSizeService.getTileSizes().subscribe({
      next: (sizes) => {
        this.tileSizes = sizes;
        this.filteredTileSizes = this.tileSizeInput.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterTileSizes(value || ''))
        );
      },
      error: (err) => {
        console.error('Error fetching tile sizes:', err);
      },
    });

    // Subscribe to tileSizeInput value changes for fetching and filtering tile designs
    this.tileSizeInput.valueChanges.subscribe((selectedSize) => {
      const selectedTileSize = this.tileSizes.find(
        (size) => size.size === selectedSize
      );
      if (selectedTileSize) {
        this.fetchAndFilterTileDesigns(selectedTileSize.id);
      }
    });

    this.tileService.tiles$.subscribe((data) => {
      this.tiles = data;
      console.log('Tiles:', this.tiles);
      this.purchases = this.tiles.flatMap((tile) => {
        return tile.purchases.map((purchase) => ({
          ...purchase,
          tile,
        }));
      });
    });

    this.tileService.fetchTiles();
  }

  private _filterTileSizes(value: string): TileSizeDTO[] {
    const filterValue = value.toLowerCase();
    return this.tileSizes.filter((size) =>
      size.size.toLowerCase().includes(filterValue)
    );
  }

  selectTileSize(size: TileSizeDTO) {
    this.tileSizeInput.setValue(size.size);
  }

  openAddTileSizeDialog(): void {
    const dialogRef = this.dialog.open(AddTileSizeDialogComponent, {
      width: '300px',
      backdropClass: 'blur-background',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the new tile size
        console.log('New tile size:', result);
        this.tileSizes.push(result);
        this.filteredTileSizes = this.tileSizeInput.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterTileSizes(value || ''))
        );
      }
    });
  }

  fetchAndFilterTileDesigns(tileSizeId: number): void {
    this.tileService.getTileDesignsBySize(tileSizeId).subscribe({
      next: (designs) => {
        this.tileDesigns = designs;
        this.filteredTileDesigns = this.tileDesignInput.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterTileDesigns(value || ''))
        );
      },
      error: (err) => {
        console.error('Error fetching tile designs:', err);
      },
    });
  }

  private _filterTileDesigns(value: string): TileDTO[] {
    const filterValue = value.toLowerCase();
    return this.tileDesigns.filter((design) =>
      design.design.toLowerCase().includes(filterValue)
    );
  }

  onTileDesignInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tileDesignInput.setValue(input.value, { emitEvent: false });
  }

  selectTileDesign(design: TileDTO) {
    this.tileDesignInput.setValue(design.design);
  }

  purchase(): void {
    if (!this.tileDesignInput.value || !this.quantityInput.value) {
      alert('Please select a tile design and quantity.');
      return;
    }

    // Find if the selected tile design is in the list
    const selectedTile = this.tileDesigns.find(
      (design) => design.design === this.tileDesignInput.value
    );

    // If not found, create a new tile design DTO
    let tileDesignDTO: TileDTO;
    if (!selectedTile) {
      tileDesignDTO = {
        id: 0, // You might need to set this to a valid id or handle it in the backend
        design: this.tileDesignInput.value,
        stock: 0, // Initial stock, adjust as necessary
        tileSize: this.tileSizes.find(
          (size) => size.size === this.tileSizeInput.value
        )!,
        sales: [],
        purchases: [],
      };
    } else {
      tileDesignDTO = selectedTile;
    }

    // Convert quantityInput value to a number
    const purchaseQtyNumber = Number(this.quantityInput.value);

    const purchaseData: PurchaseDTO = {
      id: 0, // You might need to set this to a valid id or handle it in the backend
      tile: tileDesignDTO,
      purchaseQty: purchaseQtyNumber,
    };

    console.log('Purchase data:', purchaseData);
    this.purchaseService.makePurchase(purchaseData).subscribe({
      next: (response) => {
        console.log('Purchase successful:', response);
        alert('Purchase successful!');
        window.location.reload();
      },
      error: (error) => {
        console.error('Purchase failed:', error);
        alert('Purchase failed. Please try again.');
      },
    });
  }
}
