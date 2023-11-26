import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModoReunionComponent } from './add-modo-reunion.component';

describe('AddModoReunionComponent', () => {
  let component: AddModoReunionComponent;
  let fixture: ComponentFixture<AddModoReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModoReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
