import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiclosEntidadComponent } from './ciclos-entidad.component';

describe('CiclosEntidadComponent', () => {
  let component: CiclosEntidadComponent;
  let fixture: ComponentFixture<CiclosEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiclosEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiclosEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
