import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioServiceStub } from 'src/app/shared/stubs/usuarioServiceStub';

import { DeleteUsuarioComponent } from './delete-usuario.component';

describe('DeleteUsuarioComponent', () => {
  let component: DeleteUsuarioComponent;
  let fixture: ComponentFixture<DeleteUsuarioComponent>;
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
      declarations: [ DeleteUsuarioComponent ],
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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onNoClick should close the dialog', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('deleteUser debe cerrar el modal y abrir un snackbar si se borra usuario', async () => {

    await component.deleteUser();

    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('Pulsa deleteUser HTML', fakeAsync(() => {
    spyOn(component, 'deleteUser');
    const btn = fixture.debugElement.query(By.css('#deleteUser'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(component.deleteUser).toHaveBeenCalled();
  }));

  it('Pulsa onNoClick HTML', fakeAsync(() => {
    spyOn(component, 'onNoClick');
    const btn = fixture.debugElement.query(By.css('#onNoClick'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));
});
