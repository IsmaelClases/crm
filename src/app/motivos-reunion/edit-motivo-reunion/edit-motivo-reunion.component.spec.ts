import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMotivoReunionComponent } from './edit-motivo-reunion.component';

describe('EditMotivoReunionComponent', () => {
  let component: EditMotivoReunionComponent;
  let fixture: ComponentFixture<EditMotivoReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMotivoReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMotivoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
