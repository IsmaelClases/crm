import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacanteComponent } from './add-vacante.component';

describe('AddVacanteComponent', () => {
  let component: AddVacanteComponent;
  let fixture: ComponentFixture<AddVacanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVacanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
