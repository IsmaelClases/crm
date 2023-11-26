import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModoReunionComponent } from './delete-modo-reunion.component';

describe('DeleteModoReunionComponent', () => {
  let component: DeleteModoReunionComponent;
  let fixture: ComponentFixture<DeleteModoReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModoReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
