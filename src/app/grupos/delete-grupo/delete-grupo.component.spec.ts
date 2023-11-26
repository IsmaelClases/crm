import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { GruposService } from 'src/app/services/grupos.service';
import { GruposServiceStub } from 'src/app/shared/stubs/gruposServiceStub';

import { DeleteGrupoComponent } from './delete-grupo.component';

describe('DeleteGrupoComponent', () => {
  let component: DeleteGrupoComponent;
  let fixture: ComponentFixture<DeleteGrupoComponent>;
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
      declarations: [ DeleteGrupoComponent ],
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
    fixture = TestBed.createComponent(DeleteGrupoComponent);
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

  it('deleteOpcion debe cerrar el modal y abrir un snackbar si se borra la opcion', async () => {

    await component.confirmDelete();

    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('Pulsa confirmDelete HTML', fakeAsync(() => {
    spyOn(component, 'confirmDelete');
    const btn = fixture.debugElement.query(By.css('#deleteGrupo'));
    btn.triggerEventHandler('click', null);
    expect(component.confirmDelete).toHaveBeenCalled();
  }));

  it('Pulsa onNoClick HTML', fakeAsync(() => {
    spyOn(component, 'onNoClick');
    const btn = fixture.debugElement.query(By.css('#onNoClick'));
    btn.triggerEventHandler('click', null);
    expect(component.onNoClick).toHaveBeenCalled();
  }));
});
