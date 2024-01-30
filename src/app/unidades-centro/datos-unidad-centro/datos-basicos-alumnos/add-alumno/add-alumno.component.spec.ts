import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumnoComponent } from './add-alumno.component';

describe('AddAlumnoComponent', () => {
  let component: AddAlumnoComponent;
  let fixture: ComponentFixture<AddAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
