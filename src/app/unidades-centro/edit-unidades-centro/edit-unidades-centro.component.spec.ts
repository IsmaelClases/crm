import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnidadesCentroComponent } from './edit-unidades-centro.component';

describe('EditUnidadesCentroComponent', () => {
  let component: EditUnidadesCentroComponent;
  let fixture: ComponentFixture<EditUnidadesCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUnidadesCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnidadesCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
