import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesDualComponent } from './unidades-dual.component';

describe('UnidadesDualComponent', () => {
  let component: UnidadesDualComponent;
  let fixture: ComponentFixture<UnidadesDualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesDualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesDualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
