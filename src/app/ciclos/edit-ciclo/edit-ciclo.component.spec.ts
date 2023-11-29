import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCicloComponent } from './edit-ciclo.component';

describe('EditCicloComponent', () => {
  let component: EditCicloComponent;
  let fixture: ComponentFixture<EditCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCicloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
