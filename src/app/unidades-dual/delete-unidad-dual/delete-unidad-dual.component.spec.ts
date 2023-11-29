import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnidadDualComponent } from './delete-unidad-dual.component';

describe('DeleteUnidadDualComponent', () => {
  let component: DeleteUnidadDualComponent;
  let fixture: ComponentFixture<DeleteUnidadDualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUnidadDualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUnidadDualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
