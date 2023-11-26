import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTipoEntidadComponent } from './delete-tipo-entidad.component';

describe('DeleteTipoEntidadComponent', () => {
  let component: DeleteTipoEntidadComponent;
  let fixture: ComponentFixture<DeleteTipoEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTipoEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTipoEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
