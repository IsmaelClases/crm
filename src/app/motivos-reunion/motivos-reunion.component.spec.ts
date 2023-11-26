import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivosReunionComponent } from './motivos-reunion.component';

describe('MotivosReunionComponent', () => {
  let component: MotivosReunionComponent;
  let fixture: ComponentFixture<MotivosReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivosReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivosReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
