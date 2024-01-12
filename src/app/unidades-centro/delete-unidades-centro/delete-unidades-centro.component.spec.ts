import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnidadesCentroComponent } from './delete-unidades-centro.component';

describe('DeleteUnidadesCentroComponent', () => {
  let component: DeleteUnidadesCentroComponent;
  let fixture: ComponentFixture<DeleteUnidadesCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUnidadesCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUnidadesCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
