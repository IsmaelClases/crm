import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosEntidadComponent } from './contactos-entidad.component';

describe('ContactosEntidadComponent', () => {
  let component: ContactosEntidadComponent;
  let fixture: ComponentFixture<ContactosEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactosEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactosEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
