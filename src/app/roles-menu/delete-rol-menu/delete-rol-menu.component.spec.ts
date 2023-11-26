import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { RolMenuService } from 'src/app/services/rol-menu.service';
import { RolesMenuServiceStub } from 'src/app/shared/stubs/rolMenuServiceStub';

import { DeleteRolMenuComponent } from './delete-rol-menu.component';

describe('DeleteRolMenuComponent', () => {
  let component: DeleteRolMenuComponent;
  let fixture: ComponentFixture<DeleteRolMenuComponent>;
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
      declarations: [ DeleteRolMenuComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: RolMenuService,
          useClass: RolesMenuServiceStub
        },
        {
          provide: MatSnackBar,
          useValue: mockSnackBar
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRolMenuComponent);
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

  it('deleteRolMenu debe cerrar el modal y abrir un snackbar si se borra el rol', async () => {

    await component.deleteRolMenu();

    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalled();
  });

  it('Pulsa deleteUser HTML', fakeAsync(() => {
    spyOn(component, 'deleteRolMenu');
    const btn = fixture.debugElement.query(By.css('#deleteRolMenu'));
    btn.triggerEventHandler('click', null);
    // tick();
    expect(component.deleteRolMenu).toHaveBeenCalled();
  }));

  it('Pulsa onNoClick HTML', fakeAsync(() => {
    spyOn(component, 'onNoClick');
    const btn = fixture.debugElement.query(By.css('#onNoClick'));
    btn.triggerEventHandler('click', null);
    // tick();
    expect(component.onNoClick).toHaveBeenCalled();
  }));
});
