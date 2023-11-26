import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { RolesService } from './roles.service';

describe('RolesService', () => {
  let rolesService: RolesService;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  })));

  beforeEach(() => {
    rolesService = TestBed.inject(RolesService);
  });


  it('should be created', () => {
    expect(rolesService).toBeTruthy();
  });

  it('GetRol', () => {
    const rolResponse = [
      {
        id_rol: 1,
        rol: 'test',
        observaciones: null,
    }
    ];
    let response;
    spyOn(rolesService, 'getAllRoles').and.returnValue(of(rolResponse));

    rolesService.getAllRoles().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(rolResponse);
  });

  it('AddRol', () => {
    const rol =
      {
        // id_rol: 1,
        rol: 'test',
        observaciones: null,
    };
    let response;
    spyOn(rolesService, 'addRol').and.returnValue(of('exito'));

    rolesService.addRol(rol).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });

  it('EditRol', () => {
    const rol =
      {
        id_rol: 1,
        rol: 'test',
        observaciones: null,
    };
    let response;
    spyOn(rolesService, 'editRol').and.returnValue(of('exito'));

    rolesService.editRol(rol).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });

  it('DeleteRol', () => {
    const idRol = '1';
    let response;
    spyOn(rolesService, 'deleteRol').and.returnValue(of('exito'));

    rolesService.deleteRol(idRol).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });
});
