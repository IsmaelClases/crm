import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AuthService } from '../services/auth.service';
import { AuthServiceStub } from '../shared/stubs/authServiceStub';

import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CrudMaterialModule,
        BrowserAnimationsModule,
        HomeModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('forgotPassword debe de poner formularioRecuperacion a true si el evento es true', () => {
    component.forgotPassword(true);
    expect(component.formularioRecuperacion).toBeTruthy();
  });

  it('checkPassToken debe de poner checkTokenPasswd a true si el servicio devuelve un exito', () => {
    component.checkPassToken('');
    expect(component.checkTokenPasswd).toBeTruthy();
  });
});
