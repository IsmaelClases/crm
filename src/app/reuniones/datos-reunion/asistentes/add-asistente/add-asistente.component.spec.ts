import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsistenteComponent } from './add-asistente.component';

describe('AddAsistenteComponent', () => {
  let component: AddAsistenteComponent;
  let fixture: ComponentFixture<AddAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
