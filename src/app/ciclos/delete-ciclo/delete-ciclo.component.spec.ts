import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCicloComponent } from './delete-ciclo.component';

describe('DeleteCicloComponent', () => {
  let component: DeleteCicloComponent;
  let fixture: ComponentFixture<DeleteCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCicloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
