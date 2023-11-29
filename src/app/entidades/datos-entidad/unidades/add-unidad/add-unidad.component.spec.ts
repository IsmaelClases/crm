import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactoComponent } from './add-unidad.component';

describe('AddContactoComponent', () => {
  let component: AddContactoComponent;
  let fixture: ComponentFixture<AddContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
