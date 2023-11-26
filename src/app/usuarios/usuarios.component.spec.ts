import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioServiceStub } from '../shared/stubs/usuarioServiceStub';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UsuariosComponent } from './usuarios.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogMock } from '../shared/mock/MatDialogMock';
import { Usuario } from '../shared/interfaces/usuario';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
// import { By } from '@angular/platform-browser';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let dialog: MatDialog;
  let usuarioServiceStub: UsuarioServiceStub;

  // const usuario: Usuario = {
  //   id_usuario: 'test',
  //   usuario: 'test',
  //   id_rol: 'test',
  //   rol: 'test',
  //   observaciones: null,
  //   nombre_publico: 'test',
  //   habilitado: 'test'
  // };
  // const mockDialogRef = {
  //   open: jasmine.createSpy('open')
  // };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatDialogModule,
        CrudMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ UsuariosComponent ],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock
        },
        {
          provide: UsuarioService,
          useClass: UsuarioServiceStub
        },
        MatSnackBar,
        UsuarioServiceStub
        // MatSort,
        // MatPaginator
      ]
    })
    .compileComponents();
    dialog = TestBed.inject(MatDialog);
    usuarioServiceStub = TestBed.inject(UsuarioServiceStub);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getUsuarios', async () => {
    await component.getUsuarios();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('addUsuario', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getUsuarios');
    await component.addUsuario();
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getUsuarios).toHaveBeenCalled();
  });

  it('editUsuario', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getUsuarios');
    await component.editUsuario(usuarioServiceStub.getUsuario());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getUsuarios).toHaveBeenCalled();
  });

  it('deleteUsuario', async () => {
    spyOn(dialog, 'open').and.callThrough();
    spyOn(component, 'getUsuarios');
    await component.deleteUsuario(usuarioServiceStub.getUsuario());
    expect(dialog.open).toHaveBeenCalled();
    expect(component.getUsuarios).toHaveBeenCalled();
  });

  // TODO: Investigar como testear codigo HTML dentro de una tabla para poder testear los botones.

  // it('addUsuario HTML', fakeAsync(async () => {
  //   // component.displayedColumns = ['id_usuario', 'usuario', 'nombre_publico', 'rol', 'habilitado', 'actions'];
  //   // component.ngOnInit();
  //   // fixture.detectChanges();
  //   spyOn(component, 'addUsuario');
  //   // component.sort = new MatSort();
  //   // component.paginator = new MatPaginator();
  //   await component.getUsuarios();
  //   tick();
  //   fixture.whenStable().then(() => {
  //     fixture.autoDetectChanges();
  //     const btn = fixture.debugElement.query(By.css('#id_usuario'));
  //     btn.triggerEventHandler('click', null);
  //     tick();
  //     // expect(component.sort).toBeDefined();
  //   });
  // }));

  // it('editUsuario HTML', () => {
  //   spyOn(component, 'editUsuario');
  //   const btn = fixture.debugElement.query(By.css('#editUsuario'));
  //   btn.triggerEventHandler('click', null);
  //   tick();
  //   expect(component.editUsuario).toHaveBeenCalled();
  // });

  // it('deleteUsuario HTML', () => {
  //   spyOn(component, 'deleteUsuario');
  //   const btn = fixture.debugElement.query(By.css('#deleteUsuario'));
  //   btn.triggerEventHandler('click', null);
  //   tick();
  //   expect(component.deleteUsuario).toHaveBeenCalled();
  // });
});
