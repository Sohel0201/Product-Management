import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMessageComponentTsComponent } from './response-message.component.ts.component';

describe('ResponseMessageComponentTsComponent', () => {
  let component: ResponseMessageComponentTsComponent;
  let fixture: ComponentFixture<ResponseMessageComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseMessageComponentTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseMessageComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
