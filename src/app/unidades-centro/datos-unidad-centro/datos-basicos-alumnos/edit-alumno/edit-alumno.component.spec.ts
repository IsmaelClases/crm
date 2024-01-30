import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlumnoComponent } from './edit-alumno.component';

describe('EditAlumnoComponent', () => {
  let component: EditAlumnoComponent;
  let fixture: ComponentFixture<EditAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
