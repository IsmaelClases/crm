import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContactoComponent } from './delete-contacto.component';

describe('DeleteContactoComponent', () => {
  let component: DeleteContactoComponent;
  let fixture: ComponentFixture<DeleteContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
