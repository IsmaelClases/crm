import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVacantesComponent } from './info-vacantes.component';

describe('InfoVacantesComponent', () => {
  let component: InfoVacantesComponent;
  let fixture: ComponentFixture<InfoVacantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoVacantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
