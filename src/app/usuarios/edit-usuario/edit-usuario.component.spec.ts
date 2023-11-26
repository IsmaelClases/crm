import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolesServiceStub } from 'src/app/shared/stubs/rolesServiceStub';
import { RolesMenuServiceStub } from 'src/app/shared/stubs/rolMenuServiceStub';
import { UsuarioServiceStub } from 'src/app/shared/stubs/usuarioServiceStub';

import { EditUsuarioComponent } from './edit-usuario.component';

describe('EditUsuarioComponent', () => {
  let component: EditUsuarioComponent;
  let fixture: ComponentFixture<EditUsuarioComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockSnackBar = {
    open: jasmine.createSpy('open')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
        CrudMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ EditUsuarioComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id_usuario: 'test',
            usuario: 'test',
            id_rol: 'test',
            rol: 'test',
            observaciones: null,
            nombre_publico: 'test',
            habilitado: 'test'
          }
        },
        {
          provide: MatSnackBar,
          useValue: mockSnackBar
        },
        {
          provide: UsuarioService,
          useClass: UsuarioServiceStub
        },
        {
          provide: RolesService,
          useClass: RolesServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onNoClick should close the dialog', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('El formulario es valido', () => {
    component.usuarioForm.controls.usuario.setValue('test');
    component.usuarioForm.controls.password.setValue('test');
    component.usuarioForm.controls.id_rol.setValue('test');
    component.usuarioForm.controls.nombre_publico.setValue('test');
    component.usuarioForm.controls.observaciones.setValue('test');
    component.usuarioForm.controls.id_usuario.setValue('test');
    component.usuarioForm.controls.habilitado.setValue('test');
    expect(component.usuarioForm.valid).toBeTruthy();
  });

  it('Falta el usuario en el formulario', () => {
    component.usuarioForm.controls.usuario.setValue('');
    expect(component.usuarioForm.controls.usuario.valid).toBeFalsy();
  });

  // it('Falta la contraseña en el formulario', () => {
  //   component.usuarioForm.controls.password.setValue('');
  //   expect(component.usuarioForm.controls.password.valid).toBeFalsy();
  // });

  it('Falta el id_rol en el formulario', () => {
    component.usuarioForm.controls.id_rol.setValue('');
    expect(component.usuarioForm.controls.id_rol.valid).toBeFalsy();
  });

  it('Falta el id_usuario en el formulario', () => {
    component.usuarioForm.controls.id_usuario.setValue('');
    expect(component.usuarioForm.controls.id_usuario.valid).toBeFalsy();
  });

  it('Falta el habilitado en el formulario', () => {
    component.usuarioForm.controls.habilitado.setValue('');
    expect(component.usuarioForm.controls.habilitado.valid).toBeFalsy();
  });

  it('confirmAdd debe abrir un snackbar', async () => {
    await component.confirmAdd();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('GetRoles debe de llenar la variables roles', async () => {
    await component.getRoles();
    expect(component.roles.length).toBeGreaterThan(0);
  });

  it('confirmAdd debe cerrar el modal si se crea el usuario', async () => {
    component.usuarioForm.controls.usuario.setValue('test');
    component.usuarioForm.controls.password.setValue('test');
    component.usuarioForm.controls.id_rol.setValue('test');
    component.usuarioForm.controls.nombre_publico.setValue('test');
    component.usuarioForm.controls.observaciones.setValue('test');
    component.usuarioForm.controls.id_usuario.setValue('test');
    component.usuarioForm.controls.habilitado.setValue('test');

    await component.confirmAdd();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  // Test unitarios en los botones del HTML

  it('Pulsa onSubmit HTML', fakeAsync(() => {
    spyOn(component, 'confirmAdd');
    const btn = fixture.debugElement.query(By.css('#onSubmit'));
    btn.triggerEventHandler('click', null);
    // tick();
    expect(component.confirmAdd).toHaveBeenCalled();
  }));

  it('Disabled onSubmit HTML cuando el formulario es invalido', fakeAsync(() => {
    component.usuarioForm.controls.id_usuario.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    fixture.detectChanges();
    // tick();
    expect(btn.disabled).toBeTruthy();
  }));

  it('Enabled onSubmit HTML cuando el formulario es valido', fakeAsync(() => {
    component.usuarioForm.controls.usuario.setValue('test');
    component.usuarioForm.controls.password.setValue('test');
    component.usuarioForm.controls.id_rol.setValue('test');
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    fixture.detectChanges();
    // tick();
    expect(btn.disabled).toBeFalsy();
  }));

  it('Pulsa onNoClick HTML', fakeAsync(() => {
    spyOn(component, 'onNoClick');
    const btn = fixture.debugElement.query(By.css('#onNoClick'));
    btn.triggerEventHandler('click', null);
    // tick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));
});
