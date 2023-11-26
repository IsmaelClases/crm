import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { RolMenuService } from '../services/rol-menu.service';
import { UsuarioService } from '../services/usuario.service';
import { MatDialogMock } from '../shared/mock/MatDialogMock';
import { RolesServiceStub } from '../shared/stubs/rolesServiceStub';
import { RolesMenuServiceStub } from '../shared/stubs/rolMenuServiceStub';
import { UsuarioServiceStub } from '../shared/stubs/usuarioServiceStub';

import { RolesMenuComponent } from './roles-menu.component';

describe('RolesMenuComponent', () => {
  let component: RolesMenuComponent;
  let fixture: ComponentFixture<RolesMenuComponent>;
  let dialog: MatDialog;
  let rolesMenuServiceStub: RolesMenuServiceStub;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        CrudMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ RolesMenuComponent ],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock
        },
        {
          provide: RolMenuService,
          useClass: RolesMenuServiceStub
        },
        RolesMenuServiceStub
      ]
    })
    .compileComponents();
    dialog = TestBed.inject(MatDialog);
    rolesMenuServiceStub = TestBed.inject(RolesMenuServiceStub);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesMenuComponent);
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

  it('addRolMenu', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getRoles');
    await component.addRolMenu();
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getRoles).toHaveBeenCalled();
  });

  it('editRolMenu', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getRoles');
    await component.editRolMenu(rolesMenuServiceStub.getRolMenu());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getRoles).toHaveBeenCalled();
  });

  it('deleteRolMenu', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getRoles');
    await component.deleteRolMenu(rolesMenuServiceStub.getRolMenu());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getRoles).toHaveBeenCalled();
  });
});
