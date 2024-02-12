import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVacanteComponent } from './delete-vacante.component';

describe('DeleteVacanteComponent', () => {
  let component: DeleteVacanteComponent;
  let fixture: ComponentFixture<DeleteVacanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVacanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
