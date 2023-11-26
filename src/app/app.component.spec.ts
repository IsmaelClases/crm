import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthServiceStub } from './shared/stubs/authServiceStub';
import { RouterStub } from '../app/shared/stubs/RouterStub';
import { CrudMaterialModule } from './modules/crud-material/crud-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
// const eventsStub = new BehaviorSubject<Event>(null);

// export class AuthServiceStub {
//   isAuthenticated() {
//   return of(Promise.resolve(true));
// }

// }

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  // let router: Router;
  let authService: AuthService;
  // const routerMock = {
  //   events: of(new NavigationStart(0, 'http://localhost:4200/')),
  // };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FooterModule,
        NavbarModule
        // CrudMaterialModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: Router,
          useClass: RouterStub
        },
      ]
      // providers: [
      //   HttpClient,
      //   HttpHandler
      // ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    // router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Debe mostrar el NavBar', async () => {
    // router.events.subscribe(response => {
    //   const verdadero = response instanceof NavigationStart;
    //   expect(verdadero).toBeTruthy();
    // });

    await authService.isAuthenticated('');
    // authService.isAuthenticated('').
    component.canDisplayNavbar();
    // fixture.detectChanges();
    expect(component.isDisplayNavbar).toBeTruthy();
  });

});
