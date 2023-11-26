import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { GruposService } from 'src/app/services/grupos.service';
import { OpcionesService } from 'src/app/services/opciones.service';
import { RolMenuService } from 'src/app/services/rol-menu.service';
import { RolesService } from 'src/app/services/roles.service';
import { GruposServiceStub } from 'src/app/shared/stubs/gruposServiceStub';
import { OpcionesServiceStub } from 'src/app/shared/stubs/opcionesServiceStub';
import { RolesServiceStub } from 'src/app/shared/stubs/rolesServiceStub';
import { RolesMenuServiceStub } from 'src/app/shared/stubs/rolMenuServiceStub';

import { EditRolMenuComponent } from './edit-rol-menu.component';

describe('EditRolMenuComponent', () => {
  let component: EditRolMenuComponent;
  let fixture: ComponentFixture<EditRolMenuComponent>;
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
      declarations: [ EditRolMenuComponent ],
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
          provide: GruposService,
          useClass: GruposServiceStub
        },
        {
          provide: OpcionesService,
          useClass: OpcionesServiceStub
        },
        {
          provide: RolMenuService,
          useClass: RolesMenuServiceStub
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRolMenuComponent);
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
    component.rolMenuForm.controls.id_rol_menu.setValue('test');
    component.rolMenuForm.controls.id_rol.setValue('test');
    component.rolMenuForm.controls.id_grupo.setValue('test');
    component.rolMenuForm.controls.id_opcion.setValue('test');
    component.rolMenuForm.controls.observaciones.setValue('test');
    expect(component.rolMenuForm.valid).toBeTruthy();
  });

  it('Falta el id_rol_menu en el formulario', () => {
    component.rolMenuForm.controls.id_rol_menu.setValue('');
    expect(component.rolMenuForm.controls.id_rol_menu.valid).toBeFalsy();
  });

  it('Falta el id_rol en el formulario', () => {
    component.rolMenuForm.controls.id_rol.setValue('');
    expect(component.rolMenuForm.controls.id_rol.valid).toBeFalsy();
  });

  it('Falta el id_grupo en el formulario', () => {
    component.rolMenuForm.controls.id_grupo.setValue('');
    expect(component.rolMenuForm.controls.id_grupo.valid).toBeFalsy();
  });

  it('Falta el id_opcion en el formulario', () => {
    component.rolMenuForm.controls.id_opcion.setValue('');
    expect(component.rolMenuForm.controls.id_opcion.valid).toBeFalsy();
  });

  it('confirmAdd debe abrir un snackbar', async () => {
    await component.confirmAdd();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('GetRoles debe de llenar la variables roles', async () => {
    await component.getRoles();
    expect(component.roles.length).toBeGreaterThan(0);
  });

  it('GetGrupos debe de llenar la variables grupos', async () => {
    await component.getGrupos();
    expect(component.grupos.length).toBeGreaterThan(0);
  });

  it('GetOpciones debe de llenar la variables opciones', async () => {
    await component.getOpciones();
    expect(component.opciones.length).toBeGreaterThan(0);
  });

  it('confirmAdd debe cerrar el modal si se crea el RolMenu', async () => {
    component.rolMenuForm.controls.id_rol_menu.setValue('test');
    component.rolMenuForm.controls.id_rol.setValue('test');
    component.rolMenuForm.controls.id_grupo.setValue('test');
    component.rolMenuForm.controls.id_opcion.setValue('test');
    component.rolMenuForm.controls.observaciones.setValue('test');

    await component.confirmAdd();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  // // Test unitarios en los botones del HTML

  it('Pulsa onSubmit HTML', fakeAsync(() => {
    spyOn(component, 'confirmAdd');
    const btn = fixture.debugElement.query(By.css('#onSubmit'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(component.confirmAdd).toHaveBeenCalled();
  }));

  it('Disabled onSubmit HTML cuando el formulario es invalido', fakeAsync(() => {
    component.rolMenuForm.controls.id_rol_menu.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    fixture.detectChanges();
    // tick();
    expect(btn.disabled).toBeTruthy();
  }));

  it('Enabled onSubmit HTML cuando el formulario es valido', fakeAsync(() => {
    component.rolMenuForm.controls.id_rol_menu.setValue('test');
    component.rolMenuForm.controls.id_rol.setValue('test');
    component.rolMenuForm.controls.id_grupo.setValue('test');
    component.rolMenuForm.controls.id_opcion.setValue('test');
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
