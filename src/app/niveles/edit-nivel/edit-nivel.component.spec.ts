import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNivelComponent } from './edit-nivel.component';

describe('EditNivelComponent', () => {
  let component: EditNivelComponent;
  let fixture: ComponentFixture<EditNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
