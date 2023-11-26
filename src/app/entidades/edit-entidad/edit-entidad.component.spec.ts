import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntidadComponent } from './edit-entidad.component';

describe('EditEntidadComponent', () => {
  let component: EditEntidadComponent;
  let fixture: ComponentFixture<EditEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
