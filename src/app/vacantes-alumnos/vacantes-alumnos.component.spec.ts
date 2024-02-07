import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantesAlumnosComponent } from './vacantes-alumnos.component';

describe('VacantesAlumnosComponent', () => {
  let component: VacantesAlumnosComponent;
  let fixture: ComponentFixture<VacantesAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacantesAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantesAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
