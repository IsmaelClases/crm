import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationStart, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { MenuService } from 'src/app/services/menu.service';
import { MenuServiceStub } from '../stubs/menuServiceStub';
import { RouterStub } from '../stubs/RouterStub';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CrudMaterialModule,
        BrowserAnimationsModule,
        MatMenuModule
      ],
      declarations: [ NavbarComponent ],
      providers: [
        {
          provide: MenuService,
          useClass: MenuServiceStub
        },
        {
          provide: Router,
          useClass: RouterStub,
          useValue: routerMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getMenu', async () => {
    await component.getMenu();
    expect(component.menu).toBeDefined();
  });

  it('actualizarVistaNavbar', () => {
    component.actualizarVistaNavbar('test');
    expect(component.vista).toBeDefined();
  });

  it('goPerfil', () => {
    component.goPerfil();
    expect(routerMock.navigate).toHaveBeenCalled();
  });

  it('salir', () => {
    component.salir();
    expect(routerMock.navigate).toHaveBeenCalled();
  });

  it('goPerfil', fakeAsync(() => {
    spyOn(component, 'goPerfil');
    const btn = fixture.debugElement.query(By.css('#goPerfil'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(component.goPerfil).toHaveBeenCalled();
  }));

  it('salir', fakeAsync(() => {
    spyOn(component, 'salir');
    const btn = fixture.debugElement.query(By.css('#salir'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(component.salir).toHaveBeenCalled();
  }));

  it('almacenarGrupo', fakeAsync(async () => {

    spyOn(component, 'almacenarGrupo');
    await component.getMenu();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('#almacenarGrupo'));
      btn.triggerEventHandler('click', null);
      tick();
      expect(component.almacenarGrupo).toHaveBeenCalled();
    });
  }));

  it('actualizarVistaNavbar', fakeAsync(async () => {
    spyOn(component, 'almacenarGrupo');
    await component.getMenu();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('#almacenarGrupo'));
      btn.triggerEventHandler('click', null);
      tick();
      expect(component.almacenarGrupo).toHaveBeenCalled();
    });
  }));
});
