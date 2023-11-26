import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioServiceStub } from '../shared/stubs/usuarioServiceStub';

import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  const mockSnackBar = {
    open: jasmine.createSpy('open')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        CrudMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ PerfilComponent ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: mockSnackBar
        },
        {
          provide: UsuarioService,
          useClass: UsuarioServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Abre un snackbar al llamar actualizaPerfil', async () => {
    await component.actualizarPerfil();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('El formulario es invalido si las contraseñas no coinciden', async () => {
    component.perfilForm.controls.nuevaPassword.setValue('test');
    component.perfilForm.controls.confirmarNuevaPassword.setValue('test2');
    expect(component.perfilForm.valid).toBeFalsy();
  });

  it('Llama a la funcion actualizarPerfil al pulsar el boton actualizarPerfil', fakeAsync(() => {
    spyOn(component, 'actualizarPerfil');
    const btn = fixture.debugElement.query(By.css('#actualizarPerfil'));
    btn.triggerEventHandler('click', null);
    expect(component.actualizarPerfil).toHaveBeenCalled();
  }));
});
