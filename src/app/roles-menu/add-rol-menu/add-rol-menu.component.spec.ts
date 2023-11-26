import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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

import { AddRolMenuComponent } from './add-rol-menu.component';

describe('AddRolMenuComponent', () => {
  let component: AddRolMenuComponent;
  let fixture: ComponentFixture<AddRolMenuComponent>;
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
      declarations: [ AddRolMenuComponent ],
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolMenuComponent);
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
    component.rolMenuForm.controls.id_rol.setValue('test');
    component.rolMenuForm.controls.id_grupo.setValue('test');
    component.rolMenuForm.controls.id_opcion.setValue('test');
    component.rolMenuForm.controls.observaciones.setValue('test');
    expect(component.rolMenuForm.valid).toBeTruthy();
  });

  it('Falta el id_rol en el formulario', () => {
    component.rolMenuForm.controls.id_rol.setValue('');
    expect(component.rolMenuForm.controls.id_rol.valid).toBeFalsy();
  });

  it('Falta la id_grupo en el formulario', () => {
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
    component.rolMenuForm.controls.id_rol.setValue('test');
    component.rolMenuForm.controls.id_grupo.setValue('test');
    component.rolMenuForm.controls.id_opcion.setValue('test');

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
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    fixture.detectChanges();
    expect(btn.disabled).toBeTruthy();
  }));

  it('Enabled onSubmit HTML cuando el formulario es valido', fakeAsync(() => {
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
