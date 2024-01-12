import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesCentroComponent } from './unidades-centro.component';

describe('UnidadesCentroComponent', () => {
  let component: UnidadesCentroComponent;
  let fixture: ComponentFixture<UnidadesCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
