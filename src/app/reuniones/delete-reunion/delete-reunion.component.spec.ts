import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReunionComponent } from './delete-reunion.component';

describe('DeleteReunionComponent', () => {
  let component: DeleteReunionComponent;
  let fixture: ComponentFixture<DeleteReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
