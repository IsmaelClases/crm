import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotivoNodualComponent } from './add-motivo-nodual.component';

describe('AddMotivoNodualComponent', () => {
  let component: AddMotivoNodualComponent;
  let fixture: ComponentFixture<AddMotivoNodualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMotivoNodualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMotivoNodualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
