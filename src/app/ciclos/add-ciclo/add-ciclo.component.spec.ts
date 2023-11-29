import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCicloComponent } from './add-ciclo.component';

describe('AddCicloComponent', () => {
  let component: AddCicloComponent;
  let fixture: ComponentFixture<AddCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCicloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
