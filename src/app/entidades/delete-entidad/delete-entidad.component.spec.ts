import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEntidadComponent } from './delete-entidad.component';

describe('DeleteEntidadComponent', () => {
  let component: DeleteEntidadComponent;
  let fixture: ComponentFixture<DeleteEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
