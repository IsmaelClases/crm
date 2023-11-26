import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntidadComponent } from './add-entidad.component';

describe('AddEntidadComponent', () => {
  let component: AddEntidadComponent;
  let fixture: ComponentFixture<AddEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
