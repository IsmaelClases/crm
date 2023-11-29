import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNivelComponent } from './delete-nivel.component';

describe('DeleteNivelComponent', () => {
  let component: DeleteNivelComponent;
  let fixture: ComponentFixture<DeleteNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
