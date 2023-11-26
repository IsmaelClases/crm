import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamiliaComponent } from './add-familia.component';

describe('AddFamiliaComponent', () => {
  let component: AddFamiliaComponent;
  let fixture: ComponentFixture<AddFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFamiliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
