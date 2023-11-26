import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBasicosEntidadComponent } from './datos-basicos-entidad.component';

describe('DatosBasicosEntidadComponent', () => {
  let component: DatosBasicosEntidadComponent;
  let fixture: ComponentFixture<DatosBasicosEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBasicosEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBasicosEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
