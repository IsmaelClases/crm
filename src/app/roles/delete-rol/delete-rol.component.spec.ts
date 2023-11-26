import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { RolesService } from 'src/app/services/roles.service';
import { RolesServiceStub } from 'src/app/shared/stubs/rolesServiceStub';

import { DeleteRolComponent } from './delete-rol.component';

describe('DeleteRolComponent', () => {
  let component: DeleteRolComponent;
  let fixture: ComponentFixture<DeleteRolComponent>;
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
      declarations: [ DeleteRolComponent ],
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
    fixture = TestBed.createComponent(DeleteRolComponent);
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

  it('deleteRol debe cerrar el modal y abrir un snackbar si se borra el rol', async () => {

    await component.confirmDelete();

    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('Pulsa confirmDelete HTML', fakeAsync(() => {
    spyOn(component, 'confirmDelete');
    const btn = fixture.debugElement.query(By.css('#deleteRol'));
    btn.triggerEventHandler('click', null);
    // tick();
    expect(component.confirmDelete).toHaveBeenCalled();
  }));

  it('Pulsa onNoClick HTML', fakeAsync(() => {
    spyOn(component, 'onNoClick');
    const btn = fixture.debugElement.query(By.css('#onNoClick'));
    btn.triggerEventHandler('click', null);
    // tick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));
});
