import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposEntidadComponent } from './tipos-entidad.component';

describe('TiposEntidadComponent', () => {
  let component: TiposEntidadComponent;
  let fixture: ComponentFixture<TiposEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
