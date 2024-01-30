import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBasicosUnidadCentroComponent } from './datos-basicos-unidad-centro.component';

describe('DatosBasicosUnidadCentroComponent', () => {
  let component: DatosBasicosUnidadCentroComponent;
  let fixture: ComponentFixture<DatosBasicosUnidadCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBasicosUnidadCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBasicosUnidadCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
