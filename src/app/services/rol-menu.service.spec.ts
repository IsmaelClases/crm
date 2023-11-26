import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { RolMenuService } from './rol-menu.service';

describe('RolMenuService', () => {
  let rolMenuService: RolMenuService;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  })));

  beforeEach(() => {
    rolMenuService = TestBed.inject(RolMenuService);
  });

  it('should be created', () => {
    expect(rolMenuService).toBeTruthy();
  });

  it('GetRolesMenu', () => {
    const rolMenuResponse = [
      {
        id_rol_menu: 'string',
        id_opcion_menu: 'string',
        id_grupo_menu: 'string',
        id_rol: 'string',
        observaciones: 'string',
        opcion: 'string',
        accion: 'string',
        texto_tooltip: 'string',
        grupo: 'string',
        rol: 'string',
        orden: 'string'
    }
    ];
    let response;
    spyOn(rolMenuService, 'getAllRolesMenu').and.returnValue(of(rolMenuResponse));

    rolMenuService.getAllRolesMenu().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(rolMenuResponse);
  });

  it('AddRolMenu', () => {
    const rolMenu =
      {
        id_opcion_menu: 'string',
        id_grupo_menu: 'string',
        id_rol: 'string',
        observaciones: 'string',
        opcion: 'string',
        accion: 'string',
        texto_tooltip: 'string',
        grupo: 'string',
        rol: 'string',
        orden: 'string'
    };
    let response;
    spyOn(rolMenuService, 'addRolMenu').and.returnValue(of('exito'));

    rolMenuService.addRolMenu(rolMenu).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });

  it('EditRolMenu', () => {
    const rolMenu =
      {
        id_rol_menu: 'string',
        id_opcion_menu: 'string',
        id_grupo_menu: 'string',
        id_rol: 'string',
        observaciones: 'string',
        opcion: 'string',
        accion: 'string',
        texto_tooltip: 'string',
        grupo: 'string',
        rol: 'string',
        orden: 'string'
    };
    let response;
    spyOn(rolMenuService, 'editRolMenu').and.returnValue(of('exito'));

    rolMenuService.editRolMenu(rolMenu).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });

  it('DeleteRolMenu', () => {
    const idRolMenu = '1';
    let response;
    spyOn(rolMenuService, 'deleteRolMenu').and.returnValue(of('exito'));

    rolMenuService.deleteRolMenu(idRolMenu).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });
});
