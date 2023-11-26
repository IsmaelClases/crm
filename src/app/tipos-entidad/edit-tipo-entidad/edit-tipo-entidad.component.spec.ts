import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoEntidadComponent } from './edit-tipo-entidad.component';

describe('EditTipoEntidadComponent', () => {
  let component: EditTipoEntidadComponent;
  let fixture: ComponentFixture<EditTipoEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTipoEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipoEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
