import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { RolesService } from 'src/app/services/roles.service';
import { RolesServiceStub } from 'src/app/shared/stubs/rolesServiceStub';

import { EditRolComponent } from './edit-rol.component';

describe('EditRolComponent', () => {
  let component: EditRolComponent;
  let fixture: ComponentFixture<EditRolComponent>;
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
      declarations: [ EditRolComponent ],
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
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRolComponent);
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
    component.rolForm.controls.id_rol.setValue('test');
    component.rolForm.controls.rol.setValue('test');
    component.rolForm.controls.observaciones.setValue('test');
    expect(component.rolForm.valid).toBeTruthy();
  });

  it('Falta el id_rol en el formulario', () => {
    component.rolForm.controls.id_rol.setValue('');
    expect(component.rolForm.controls.id_rol.valid).toBeFalsy();
  });

  it('Falta el rol en el formulario', () => {
    component.rolForm.controls.rol.setValue('');
    expect(component.rolForm.controls.rol.valid).toBeFalsy();
  });

  it('confirmAdd debe abrir un snackbar', async () => {
    await component.confirmAdd();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('confirmAdd debe cerrar el modal si se crea el Rol', async () => {
    component.rolForm.controls.id_rol.setValue('test');
    component.rolForm.controls.rol.setValue('test');
    component.rolForm.controls.observaciones.setValue('test');

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
    component.rolForm.controls.id_rol.setValue('');
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    fixture.detectChanges();
    expect(btn.disabled).toBeTruthy();
  }));

  it('Enabled onSubmit HTML cuando el formulario es valido', fakeAsync(() => {
    component.rolForm.controls.id_rol.setValue('test');
    component.rolForm.controls.rol.setValue('test');
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
