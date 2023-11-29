import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnidadComponent } from './delete-unidad.component';

describe('DeleteUnidadComponent', () => {
  let component: DeleteUnidadComponent;
  let fixture: ComponentFixture<DeleteUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
