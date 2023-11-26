import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReunionComponent } from './edit-reunion.component';

describe('EditReunionComponent', () => {
  let component: EditReunionComponent;
  let fixture: ComponentFixture<EditReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
