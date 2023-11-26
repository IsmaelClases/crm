import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactoComponent } from './edit-contacto.component';

describe('EditContactoComponent', () => {
  let component: EditContactoComponent;
  let fixture: ComponentFixture<EditContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
