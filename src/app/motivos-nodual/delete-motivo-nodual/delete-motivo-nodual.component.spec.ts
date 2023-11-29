import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMotivoNodualComponent } from './delete-motivo-nodual.component';

describe('DeleteMotivoNodualComponent', () => {
  let component: DeleteMotivoNodualComponent;
  let fixture: ComponentFixture<DeleteMotivoNodualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMotivoNodualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMotivoNodualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
