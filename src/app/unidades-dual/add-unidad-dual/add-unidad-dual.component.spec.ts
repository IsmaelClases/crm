import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnidadDualComponent } from './add-unidad-dual.component';

describe('AddUnidadDualComponent', () => {
  let component: AddUnidadDualComponent;
  let fixture: ComponentFixture<AddUnidadDualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnidadDualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnidadDualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
