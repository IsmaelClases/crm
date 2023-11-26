import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoEntidadComponent } from './add-tipo-entidad.component';

describe('AddTipoEntidadComponent', () => {
  let component: AddTipoEntidadComponent;
  let fixture: ComponentFixture<AddTipoEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipoEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
