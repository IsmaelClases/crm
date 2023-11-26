import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistentesComponent } from './asistentes.component';

describe('AsistentesComponent', () => {
  let component: AsistentesComponent;
  let fixture: ComponentFixture<AsistentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
