import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBasicosAlumnosComponent } from './datos-basicos-alumnos.component';

describe('DatosBasicosAlumnosComponent', () => {
  let component: DatosBasicosAlumnosComponent;
  let fixture: ComponentFixture<DatosBasicosAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBasicosAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBasicosAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
