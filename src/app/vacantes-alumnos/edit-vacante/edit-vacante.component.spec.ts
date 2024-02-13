import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacanteComponent } from './edit-vacante.component';

describe('EditVacanteComponent', () => {
  let component: EditVacanteComponent;
  let fixture: ComponentFixture<EditVacanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVacanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
