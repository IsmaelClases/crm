import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnidadDualComponent } from './edit-unidad-dual.component';

describe('EditUnidadDualComponent', () => {
  let component: EditUnidadDualComponent;
  let fixture: ComponentFixture<EditUnidadDualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUnidadDualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnidadDualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
