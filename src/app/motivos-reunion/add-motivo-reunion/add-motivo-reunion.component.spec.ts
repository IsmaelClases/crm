import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMotivoReunionComponent } from './add-motivo-reunion.component';

describe('AddMotivoReunionComponent', () => {
  let component: AddMotivoReunionComponent;
  let fixture: ComponentFixture<AddMotivoReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMotivoReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMotivoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
