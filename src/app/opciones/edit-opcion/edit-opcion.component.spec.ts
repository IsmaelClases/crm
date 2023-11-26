import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { OpcionesService } from 'src/app/services/opciones.service';
import { OpcionesServiceStub } from 'src/app/shared/stubs/opcionesServiceStub';

import { EditOpcionComponent } from './edit-opcion.component';

describe('EditOpcionComponent', () => {
  let component: EditOpcionComponent;
  let fixture: ComponentFixture<EditOpcionComponent>;
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
      declarations: [ EditOpcionComponent ],
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
          provide: OpcionesService,
          useClass: OpcionesServiceStub
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOpcionComponent);
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
    component.opcionForm.controls.id_opcion_menu.setValue('test');
    component.opcionForm.controls.opcion.setValue('test');
    component.opcionForm.controls.accion.setValue('test');
    expect(component.opcionForm.valid).toBeTruthy();
  });

  it('Falta el id_opcion_menu en el formulario', () => {
    component.opcionForm.controls.id_opcion_menu.setValue('');
    expect(component.opcionForm.controls.id_opcion_menu.valid).toBeFalsy();
  });

  it('Falta el opcion en el formulario', () => {
    component.opcionForm.controls.opcion.setValue('');
    expect(component.opcionForm.controls.opcion.valid).toBeFalsy();
  });

  it('Falta el accion en el formulario', () => {
    component.opcionForm.controls.accion.setValue('');
    expect(component.opcionForm.controls.accion.valid).toBeFalsy();
  });

  it('confirmAdd debe abrir un snackbar', async () => {
    await component.confirmAdd();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('confirmAdd debe cerrar el modal si se crea la opcion', async () => {
    component.opcionForm.controls.id_opcion_menu.setValue('test');
    component.opcionForm.controls.opcion.setValue('test');
    component.opcionForm.controls.accion.setValue('test');

    await component.confirmAdd();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  // Test unitarios en los botones del HTML

  it('Pulsa onSubmit HTML', fakeAsync(() => {
    spyOn(component, 'confirmAdd');
    const btn = fixture.debugElement.query(By.css('#onSubmit'));
    btn.triggerEventHandler('click', null);
    expect(component.confirmAdd).toHaveBeenCalled();
  }));

  it('Disabled onSubmit HTML cuando el formulario es invalido', fakeAsync(() => {
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    fixture.detectChanges();
    expect(btn.disabled).toBeTruthy();
  }));

  it('Enabled onSubmit HTML cuando el formulario es valido', fakeAsync(() => {
    component.opcionForm.controls.id_opcion_menu.setValue('test');
    component.opcionForm.controls.opcion.setValue('test');
    component.opcionForm.controls.accion.setValue('test');
    const btn = fixture.debugElement.nativeElement.querySelector('#onSubmit');
    fixture.detectChanges();
    expect(btn.disabled).toBeFalsy();
  }));

  it('Pulsa onNoClick HTML', fakeAsync(() => {
    spyOn(component, 'onNoClick');
    const btn = fixture.debugElement.query(By.css('#onNoClick'));
    btn.triggerEventHandler('click', null);
    expect(component.onNoClick).toHaveBeenCalled();
  }));
});
