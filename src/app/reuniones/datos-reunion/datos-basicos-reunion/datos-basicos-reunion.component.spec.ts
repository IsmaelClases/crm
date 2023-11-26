import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosBasicosReunionComponent } from './datos-basicos-reunion.component';

describe('DatosBasicosReunionComponent', () => {
  let component: DatosBasicosReunionComponent;
  let fixture: ComponentFixture<DatosBasicosReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosBasicosReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosBasicosReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
