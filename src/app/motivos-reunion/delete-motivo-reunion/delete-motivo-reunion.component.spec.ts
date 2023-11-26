import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMotivoReunionComponent } from './delete-motivo-reunion.component';

describe('DeleteMotivoReunionComponent', () => {
  let component: DeleteMotivoReunionComponent;
  let fixture: ComponentFixture<DeleteMotivoReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMotivoReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMotivoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
