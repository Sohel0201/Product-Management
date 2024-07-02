import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TileSizeService } from '../../services/tile-size.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TileSizeDTO } from '../../models/tile-size.model';
import { ResponseMessageComponent } from '../response-message.component.ts/response-message.component.ts.component';

@Component({
  selector: 'app-add-tile-size-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,

    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-tile-size-dialog.component.html',
  styleUrl: './add-tile-size-dialog.component.css',
})
export class AddTileSizeDialogComponent {
  newSize: string = '';

  constructor(
    private tileSizeService: TileSizeService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddTileSizeDialogComponent>
  ) {}

  onSave(): void {
    if (this.newSize) {
      const newTileSize: TileSizeDTO = { id: 0, size: this.newSize, tiles: [] };

      this.tileSizeService.createTileSize(newTileSize).subscribe({
        next: (result) => {
          this.snackBar.openFromComponent(ResponseMessageComponent, {
            data: { message: 'Tile size added successfully' },
            duration: 3000,
          });
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error adding tile size:', error);
          this.snackBar.openFromComponent(ResponseMessageComponent, {
            data: { message: 'Failed to add tile size' },
            duration: 3000,
          });
        },
      });
    } else {
      this.snackBar.openFromComponent(ResponseMessageComponent, {
        data: { message: 'Tile size cannot be empty' },
        duration: 3000,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
