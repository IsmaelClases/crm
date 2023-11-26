import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAsistenteComponent } from './delete-asistente.component';

describe('DeleteAsistenteComponent', () => {
  let component: DeleteAsistenteComponent;
  let fixture: ComponentFixture<DeleteAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
