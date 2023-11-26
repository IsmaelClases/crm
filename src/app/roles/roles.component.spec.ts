import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { RolesService } from '../services/roles.service';
import { MatDialogMock } from '../shared/mock/MatDialogMock';
import { RolesServiceStub } from '../shared/stubs/rolesServiceStub';

import { RolesComponent } from './roles.component';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let dialog: MatDialog;
  let rolesServiceStub: RolesServiceStub;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        CrudMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ RolesComponent ],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock
        },
        {
          provide: RolesService,
          useClass: RolesServiceStub
        },
        RolesServiceStub
      ],
    })
    .compileComponents();

    dialog = TestBed.inject(MatDialog);
    rolesServiceStub = TestBed.inject(RolesServiceStub);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRoles', async () => {
    await component.getRoles();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('addRol', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getRoles');
    await component.addRol();
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getRoles).toHaveBeenCalled();
  });

  it('editRol', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getRoles');
    await component.editRol(rolesServiceStub.getRol());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getRoles).toHaveBeenCalled();
  });

  it('deleteRol', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getRoles');
    await component.deleteRol(rolesServiceStub.getRol());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getRoles).toHaveBeenCalled();
  });
});
