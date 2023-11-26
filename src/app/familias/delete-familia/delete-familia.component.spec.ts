import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFamiliaComponent } from './delete-familia.component';

describe('DeleteFamiliaComponent', () => {
  let component: DeleteFamiliaComponent;
  let fixture: ComponentFixture<DeleteFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFamiliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
