import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTileSizeDialogComponent } from './add-tile-size-dialog.component';

describe('AddTileSizeDialogComponent', () => {
  let component: AddTileSizeDialogComponent;
  let fixture: ComponentFixture<AddTileSizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTileSizeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTileSizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
