import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnidadesCentroComponent } from './add-unidades-centro.component';

describe('AddUnidadesCentroComponent', () => {
  let component: AddUnidadesCentroComponent;
  let fixture: ComponentFixture<AddUnidadesCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnidadesCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnidadesCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
