import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEntidadComponent } from './datos-entidad.component';

describe('DatosEntidadComponent', () => {
  let component: DatosEntidadComponent;
  let fixture: ComponentFixture<DatosEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
