import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMotivoNodualComponent } from './edit-motivo-nodual.component';

describe('EditMotivoNodualComponent', () => {
  let component: EditMotivoNodualComponent;
  let fixture: ComponentFixture<EditMotivoNodualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMotivoNodualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMotivoNodualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
