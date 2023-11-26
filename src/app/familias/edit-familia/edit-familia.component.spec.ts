import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFamiliaComponent } from './edit-familia.component';

describe('EditFamiliaComponent', () => {
  let component: EditFamiliaComponent;
  let fixture: ComponentFixture<EditFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFamiliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
