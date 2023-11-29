import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivosNodualComponent } from './motivos-nodual.component';

describe('MotivosNodualComponent', () => {
  let component: MotivosNodualComponent;
  let fixture: ComponentFixture<MotivosNodualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivosNodualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivosNodualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
