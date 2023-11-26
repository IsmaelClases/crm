import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AddUsuarioComponent } from './add-usuario.component';
import { RolesService } from 'src/app/services/roles.service';
import { RolesServiceStub } from '../../shared/stubs/rolesServiceStub';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioServiceStub } from 'src/app/shared/stubs/usuarioServiceStub';
import { By } from '@angular/platform-browser';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddUsuarioComponent', () => {
  let component: AddUsuarioComponent;
  let fixture: ComponentFixture<AddUsuarioComponent>;
  let servicioRoles: RolesService;
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
      declarations: [
        AddUsuarioComponent,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: MatSnackBar,
          useValue: mockSnackBar
        },
        {
          provide: RolesService,
          useClass: RolesServiceStub
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
    fixture = TestBed.createComponent(AddUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    servicioRoles = TestBed.inject(RolesService);
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
    expect(component.usuarioForm.valid).toBeTruthy();
  });

  it('Falta el usuario en el formulario', () => {
    component.usuarioForm.controls.usuario.setValue('');
    expect(component.usuarioForm.controls.usuario.valid).toBeFalsy();
  });

  it('Falta la contraseña en el formulario', () => {
    component.usuarioForm.controls.password.setValue('');
    expect(component.usuarioForm.controls.password.valid).toBeFalsy();
  });

  it('Falta el id_rol en el formulario', () => {
    component.usuarioForm.controls.id_rol.setValue('');
    expect(component.usuarioForm.controls.id_rol.valid).toBeFalsy();
  });

  it('confirmAdd debe abrir un snackbar', () => {
    component.confirmAdd();
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

    await component.confirmAdd();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  // Test unitarios en los botones del HTML

  it('Pulsa onSubmit HTML', fakeAsync(() => {
    spyOn(component, 'confirmAdd');
    const btn = fixture.debugElement.query(By.css('#onSubmit'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(component.confirmAdd).toHaveBeenCalled();
  }));

  it('Disabled onSubmit HTML cuando el formulario es invalido', fakeAsync(() => {
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    tick();
    expect(btn.disabled).toBeTruthy();
  }));

  it('Enabled onSubmit HTML cuando el formulario es valido', fakeAsync(() => {
    component.usuarioForm.controls.usuario.setValue('test');
    component.usuarioForm.controls.password.setValue('test');
    component.usuarioForm.controls.id_rol.setValue('test');
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    fixture.detectChanges();
    expect(btn.disabled).toBeFalsy();
  }));

  it('Pulsa onNoClick HTML', fakeAsync(() => {
    spyOn(component, 'onNoClick');
    const btn = fixture.debugElement.query(By.css('#onNoClick'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));
});
