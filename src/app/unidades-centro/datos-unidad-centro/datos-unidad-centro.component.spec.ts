import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosUnidadCentroComponent } from './datos-unidad-centro.component';

describe('DatosUnidadCentroComponent', () => {
  let component: DatosUnidadCentroComponent;
  let fixture: ComponentFixture<DatosUnidadCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosUnidadCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosUnidadCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
