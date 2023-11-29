import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnidadComponent } from './edit-unidad.component';

describe('EditUnidadComponent', () => {
  let component: EditUnidadComponent;
  let fixture: ComponentFixture<EditUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
