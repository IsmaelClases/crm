import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { GruposService } from 'src/app/services/grupos.service';
import { GruposServiceStub } from 'src/app/shared/stubs/gruposServiceStub';

import { EditGrupoComponent } from './edit-grupo.component';

describe('EditGrupoComponent', () => {
  let component: EditGrupoComponent;
  let fixture: ComponentFixture<EditGrupoComponent>;
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
      declarations: [ EditGrupoComponent ],
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
          provide: GruposService,
          useClass: GruposServiceStub
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrupoComponent);
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
    component.grupoForm.controls.id_grupo_menu.setValue('test');
    component.grupoForm.controls.grupo.setValue('test');
    component.grupoForm.controls.orden.setValue(1);
    expect(component.grupoForm.valid).toBeTruthy();
  });

  it('Falta el id_grupo_menu en el formulario', () => {
    component.grupoForm.controls.id_grupo_menu.setValue('');
    expect(component.grupoForm.controls.id_grupo_menu.valid).toBeFalsy();
  });

  it('Falta el grupo en el formulario', () => {
    component.grupoForm.controls.grupo.setValue('');
    expect(component.grupoForm.controls.grupo.valid).toBeFalsy();
  });

  it('Falta el orden en el formulario', () => {
    component.grupoForm.controls.orden.setValue(null);
    expect(component.grupoForm.controls.orden.valid).toBeFalsy();
  });

  it('confirmAdd debe abrir un snackbar', async () => {
    await component.confirmAdd();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('confirmAdd debe cerrar el modal si se crea el grupo', async () => {
    component.grupoForm.controls.id_grupo_menu.setValue('test');
    component.grupoForm.controls.grupo.setValue('test');
    component.grupoForm.controls.orden.setValue(1);

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
    component.grupoForm.controls.id_grupo_menu.setValue('test');
    component.grupoForm.controls.grupo.setValue('test');
    component.grupoForm.controls.orden.setValue(1);
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
