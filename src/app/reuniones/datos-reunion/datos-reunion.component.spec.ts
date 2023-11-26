import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosReunionComponent } from './datos-reunion.component';

describe('DatosReunionComponent', () => {
  let component: DatosReunionComponent;
  let fixture: ComponentFixture<DatosReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
