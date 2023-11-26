import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModosReunionComponent } from './modos-reunion.component';

describe('ModosReunionComponent', () => {
  let component: ModosReunionComponent;
  let fixture: ComponentFixture<ModosReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModosReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModosReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
