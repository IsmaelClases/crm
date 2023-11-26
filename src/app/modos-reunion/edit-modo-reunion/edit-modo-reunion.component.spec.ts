import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModoReunionComponent } from './edit-modo-reunion.component';

describe('EditModoReunionComponent', () => {
  let component: EditModoReunionComponent;
  let fixture: ComponentFixture<EditModoReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModoReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
